import { InferSchemaType, Model, Schema, model } from 'mongoose';

const footerSchema = new Schema({
  text: {
    minLength: 300,
    type: String,
    required: true,
  },
  bottomText: {
    type: String,
    required: true,
    minLength: 10,
  },
  title: {
    minLength: 3,
    trim: true,
    type: String,
    required: true,
  },
  imgCover: {
    img: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  social: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Social',
    },
  ],
});

footerSchema.pre('findOne', async function (next) {
  this.populate('social');
  next();
});

export type TFooter = InferSchemaType<typeof footerSchema>;
export type TFooterModel = Model<TFooter>;

const Footer = model<TFooter, TFooterModel>('Footer', footerSchema);

export default Footer;
