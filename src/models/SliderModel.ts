import { InferSchemaType, Model, Schema, model } from 'mongoose';

const sliderSchema = new Schema({
  text: {
    minLength: 20,
    type: String,
    required: true,
  },
  subtitle: {
    minLength: 3,
    trim: true,
    type: String,
    required: true,
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
  imgMain: {
    img: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

export type TSlider = InferSchemaType<typeof sliderSchema>;
export type TSliderModel = Model<TSlider>;

const Slider = model<TSlider, TSliderModel>('Slider', sliderSchema);

export default Slider;
