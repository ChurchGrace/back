import { protect, restrictTo } from './../controllers/authController';
import express from 'express';
import { createSlide, getSlides, updateSlide } from 'src/controllers/sliderController';
import { setCloudinaryFolder, uploadAllImgs } from 'src/controllers/uploadController';

const router = express.Router();

router
  .route('/')
  .get(getSlides)
  .post(protect, restrictTo('admin'), uploadAllImgs, setCloudinaryFolder('Slider'), createSlide);

router
  .route('/:id')
  .patch(protect, restrictTo('admin'), uploadAllImgs, setCloudinaryFolder('Slider'), updateSlide);

export default router;
