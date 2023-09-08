import express from 'express';
import { protect, restrictTo } from 'src/controllers/authController';
import {
  createSocial,
  deleteSocial,
  getSocial,
  updateSocial,
} from 'src/controllers/socialController';
import { setCloudinaryFolder, uploadImgMain } from 'src/controllers/uploadController';

const router = express.Router();

router
  .route('/')
  .get(getSocial)
  .post(protect, restrictTo('admin'), uploadImgMain, setCloudinaryFolder('Social'), createSocial);

router
  .route('/:id')
  .delete(protect, restrictTo('admin'), deleteSocial)
  .patch(protect, restrictTo('admin'), uploadImgMain, setCloudinaryFolder('Social'), updateSocial);

export default router;
