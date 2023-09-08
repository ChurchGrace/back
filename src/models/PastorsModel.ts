import { InferSchemaType, Model, Schema, model } from 'mongoose';
import { destroyImg } from 'src/utils/uploadPhotos';

const pastorsSchema = new Schema({
  imgMain: {
    img: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  surname: {
    minLength: 3,
    type: String,
    trim: true,
    required: true,
  },
  name: {
    minLength: 3,
    type: String,
    trim: true,
    required: true,
  },
  job: {
    minLength: 3,
    type: String,
    trim: true,
    required: true,
  },
});

pastorsSchema.pre('findOneAndDelete', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  await destroyImg(docToUpdate.imgMain.img);
  next();
});

export type TPastors = InferSchemaType<typeof pastorsSchema>;
export type TPastorsModel = Model<TPastors>;

const Pastors = model<TPastors, TPastorsModel>('Pastors', pastorsSchema);

export default Pastors;
