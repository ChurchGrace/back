import { InferSchemaType, Model, Schema, model } from 'mongoose';
import Footer from './FooterModel';
import { destroyImg } from 'src/utils/uploadPhotos';
import AppError from 'src/utils/AppError';

const socialSchema = new Schema({
  title: {
    trim: true,
    minLength: 3,
    type: String,
    required: true,
  },
  url: {
    trim: true,
    type: String,
    required: true,
  },
  imgMain: {
    img: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

socialSchema.post('save', async function (doc, next) {
  await Footer.findOneAndUpdate({ $push: { social: doc._id } });
  next();
});

socialSchema.pre('findOneAndDelete', async function (next) {
  const docs = await this.model.countDocuments();
  if (docs === 1) {
    next(new AppError('You can delete the last document', 400));
  }
  const docToUpdate = await this.model.findOne(this.getQuery());
  await destroyImg(docToUpdate.imgMain.img);
  await Footer.findOneAndUpdate({ $pull: { social: docToUpdate._id } });
  next();
});

export type TSocial = InferSchemaType<typeof socialSchema>;
export type TSocialModel = Model<TSocial>;

const Social = model<TSocial, TSocialModel>('Social', socialSchema);

export default Social;
