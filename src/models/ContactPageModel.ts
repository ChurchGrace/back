import { InferSchemaType, Model, Schema, model } from 'mongoose';

const contactPageSchema = new Schema({
  text: {
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
  imgCover: {
    img: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  blocks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ContactBlock',
    },
  ],
});

contactPageSchema.pre('findOne', async function (next) {
  this.populate('blocks');
  next();
});

export type TContact = InferSchemaType<typeof contactPageSchema>;
export type TContactModel = Model<TContact>;

const ContactPage = model<TContact, TContactModel>('ContactPage', contactPageSchema);

export default ContactPage;
