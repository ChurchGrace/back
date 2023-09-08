import { InferSchemaType, Model, Schema, model } from 'mongoose';

const infoSectionsSchema = new Schema({
  text: {
    minLength: 150,
    type: String,
    required: true,
  },
  title: {
    minLength: 3,
    trim: true,
    type: String,
    required: true,
  },
  subtitle: {
    minLength: 3,
    trim: true,
    type: String,
    required: true,
  },
  textBtn: {
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
});

export type TInfo = InferSchemaType<typeof infoSectionsSchema>;
export type TInfoModel = Model<TInfo>;

const InfoSections = model<TInfo, TInfoModel>('InfoSections', infoSectionsSchema);

export default InfoSections;
