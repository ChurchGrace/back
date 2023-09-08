import { InferSchemaType, Model, Schema, model } from 'mongoose';
import AppError from 'src/utils/AppError';

const timeSchema = new Schema({
  time: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },
  event: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },
});

timeSchema.pre('findOneAndDelete', async function (next) {
  const docs = await this.model.countDocuments();
  if (docs === 1) {
    next(new AppError('You can delete the last document', 400));
  }
  next();
});

export type TTime = InferSchemaType<typeof timeSchema>;
export type TTimeModel = Model<TTime>;

const Time = model<TTime, TTimeModel>('Time', timeSchema);

export default Time;
