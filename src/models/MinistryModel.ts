import { InferSchemaType, Model, Schema, model } from 'mongoose';
import { destroyImg } from 'src/utils/uploadPhotos';
import Navigation from './NaviagtionModel';
import { transformText } from 'src/utils/cyrillicToTranslit';
import AppError from 'src/utils/AppError';

const ministrySchema = new Schema({
  imgCover: {
    url: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  imgMain: {
    url: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  imgs: [
    {
      url: {
        type: String,
      },
      img: {
        type: String,
      },
    },
  ],
  text: {
    type: String,
    required: true,
    minLength: 300,
  },
  title: {
    trim: true,
    unique: true,
    type: String,
    required: true,
    minLength: 3,
  },
  url: {
    type: String,
  },
});

ministrySchema.pre('findOneAndDelete', async function (next) {
  const docs = await this.model.countDocuments();
  if (docs === 1) {
    next(new AppError('You can delete the last document', 400));
  }
  const docToUpdate = await this.model.findOne(this.getQuery());
  await destroyImg(docToUpdate.imgCover.img);
  await destroyImg(docToUpdate.imgMain.img);
  await Promise.all(
    docToUpdate.imgs.map((item: { url: string; img: string }) => {
      destroyImg(item.img);
    }),
  );
  await Navigation.findOneAndUpdate(
    { title: 'Служение' },
    { $pull: { submenu: { title: docToUpdate.title } } },
  );
  next();
});

ministrySchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  // @ts-ignore: Unreachable code error
  const title = this.getUpdate()?.title?.trim();
  if (title) {
    this.setUpdate({ ...this.getUpdate(), url: transformText(title) });
    await Navigation.findOneAndUpdate(
      { 'submenu.title': docToUpdate.title },
      {
        $set: {
          'submenu.$.url': `/ministry/${transformText(title)}`,
          'submenu.$.title': title,
        },
      },
    );
  }
  next();
});

ministrySchema.pre('save', async function (next) {
  this.url = transformText(this.title);
  next();
});

ministrySchema.post('save', async function (doc, next) {
  await Navigation.findOneAndUpdate(
    { title: 'Служение' },
    {
      $push: {
        submenu: {
          title: doc.title,
          url: `/ministry/${doc.url}`,
        },
      },
    },
  );

  next();
});

export type TMinistry = InferSchemaType<typeof ministrySchema>;
export type TMinistryModel = Model<TMinistry>;

const Ministry = model<TMinistry, TMinistryModel>('Ministry', ministrySchema);

export default Ministry;
