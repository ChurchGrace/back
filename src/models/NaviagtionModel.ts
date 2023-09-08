import { InferSchemaType, Model, Schema, model } from 'mongoose';

const navigationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  submenu: [
    {
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

export type TNavigation = InferSchemaType<typeof navigationSchema>;
export type TNavigationModel = Model<TNavigation>;

const Navigation = model<TNavigation, TNavigationModel>('Navigation', navigationSchema);

export default Navigation;
