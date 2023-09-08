import { InferSchemaType, Model, Schema, model } from 'mongoose';
import Contact from './ContactPageModel';
import { destroyImg } from 'src/utils/uploadPhotos';
import AppError from 'src/utils/AppError';

const contactBlockSchema = new Schema({
  text: {
    type: String,
    minLength: 20,
    required: true,
  },
  title: {
    trim: true,
    minLength: 3,
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

contactBlockSchema.post('save', async function (doc, next) {
  await Contact.findOneAndUpdate({ $push: { blocks: doc._id } });
  next();
});

contactBlockSchema.pre('findOneAndDelete', async function (next) {
  const docs = await this.model.countDocuments();
  if (docs === 1) {
    next(new AppError('You can delete the last document', 400));
  }
  const docToUpdate = await this.model.findOne(this.getQuery());
  await destroyImg(docToUpdate.imgMain.img);
  await Contact.findOneAndUpdate({ $pull: { blocks: docToUpdate._id } });
  next();
});

export type TContactBlock = InferSchemaType<typeof contactBlockSchema>;
export type TContactBlockModel = Model<TContactBlock>;

const ContactBlock = model<TContactBlock, TContactBlockModel>('ContactBlock', contactBlockSchema);

export default ContactBlock;
