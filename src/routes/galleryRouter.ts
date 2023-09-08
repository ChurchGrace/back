import { protect, restrictTo } from './../controllers/authController';
import express from 'express';
import { createPhoto, deletePhoto, getAllPhotos } from 'src/controllers/galleryController';
import { setCloudinaryFolder, uploadImgMain } from 'src/controllers/uploadController';

const router = express.Router();

router
  .route('/')
  .get(getAllPhotos)
  .post(protect, restrictTo('admin'), uploadImgMain, setCloudinaryFolder('Gallery'), createPhoto);

router.route('/:id').delete(protect, restrictTo('admin'), deletePhoto);

export default router;
