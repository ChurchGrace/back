import { protect, restrictTo } from './../controllers/authController';
import express from 'express';
import { createFooter, getFooter, updateFooter } from 'src/controllers/footerController';
import { setCloudinaryFolder, uploadImgCover } from 'src/controllers/uploadController';

const router = express.Router();

router
  .route('/')
  .get(getFooter)
  .post(protect, restrictTo('admin'), uploadImgCover, setCloudinaryFolder('Footer'), createFooter);

router
  .route('/:id')
  .patch(protect, restrictTo('admin'), uploadImgCover, setCloudinaryFolder('Footer'), updateFooter);

export default router;
