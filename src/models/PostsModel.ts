import { InferSchemaType, Model, Schema, model } from 'mongoose';
import { transformText } from 'src/utils/cyrillicToTranslit';
import { destroyImg } from 'src/utils/uploadPhotos';

const PostsSchema = new Schema({
  text: {
    type: String,
    minLength: 300,
    required: true,
  },
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  title: {
    type: String,
    minLength: 3,
    unique: true,
    required: true,
    trim: true,
  },
  url: {
    type: String,
  },
  imgMain: {
    img: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

PostsSchema.pre('save', async function (next) {
  this.url = transformText(this.title);
  next();
});

PostsSchema.pre('findOneAndUpdate', async function (next) {
  // @ts-ignore: Unreachable code error
  const title = this.getUpdate()?.title?.trim();
  if (title) {
    this.setUpdate({ ...this.getUpdate(), url: transformText(title) });
  }
  next();
});

PostsSchema.pre('findOneAndDelete', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (docToUpdate?.imgMain?.img) {
    await destroyImg(docToUpdate.imgMain.img);
  }

  next();
});

export type TPosts = InferSchemaType<typeof PostsSchema>;
export type TPostsModel = Model<TPosts>;

const Posts = model<TPosts, TPostsModel>('Post', PostsSchema);

export default Posts;
