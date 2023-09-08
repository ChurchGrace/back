import { protect, restrictTo } from './../controllers/authController';
import express from 'express';
import {
  createMinistry,
  deleteMinistry,
  getAllMinistry,
  getMinistry,
  updateMinistry,
} from 'src/controllers/ministryController';
import { setCloudinaryFolder, uploadAllImgs } from 'src/controllers/uploadController';

const router = express.Router();

router
  .route('/')
  .get(getAllMinistry)
  .post(
    protect,
    restrictTo('admin'),
    uploadAllImgs,
    setCloudinaryFolder('Ministry'),
    createMinistry,
  );
router
  .route('/:id')
  .get(getMinistry)
  .delete(protect, restrictTo('admin'), deleteMinistry)
  .patch(
    protect,
    restrictTo('admin'),
    uploadAllImgs,
    setCloudinaryFolder('Ministry'),
    updateMinistry,
  );

export default router;
