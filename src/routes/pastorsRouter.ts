import { protect, restrictTo } from './../controllers/authController';
import express from 'express';
import {
  createPastor,
  deletePastor,
  getPastors,
  updatePastor,
} from 'src/controllers/pastorsController';
import { setCloudinaryFolder, uploadImgMain } from 'src/controllers/uploadController';

const router = express.Router();

router
  .route('/')
  .get(getPastors)
  .post(protect, restrictTo('admin'), uploadImgMain, setCloudinaryFolder('Pastors'), createPastor);

router
  .route('/:id')
  .delete(protect, restrictTo('admin'), deletePastor)
  .patch(protect, restrictTo('admin'), uploadImgMain, setCloudinaryFolder('Pastors'), updatePastor);

export default router;
