import { InferSchemaType, Model, Schema, model } from 'mongoose';
import AppError from 'src/utils/AppError';

const historySchema = new Schema({
  text: {
    type: String,
    required: true,
    minLength: 300,
  },
  title: {
    type: String,
    minLength: 3,
    trim: true,
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

historySchema.pre('findOneAndDelete', async function (next) {
  const docs = await this.model.countDocuments();
  if (docs === 1) {
    next(new AppError('You can delete the last document', 400));
  }
  next();
});

export type THistory = InferSchemaType<typeof historySchema>;
export type THistoryModel = Model<THistory>;

const History = model<THistory, THistoryModel>('History', historySchema);

export default History;
