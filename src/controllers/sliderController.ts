import Slider from 'src/models/SliderModel';
import { createOne, getAll, updateOne } from './handleFactory';

export const createSlide = createOne(Slider);
export const getSlides = getAll(Slider);
export const updateSlide = updateOne(Slider);
