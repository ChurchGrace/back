import { protect, restrictTo } from './../controllers/authController';
import express from 'express';
import {
  createHistory,
  deleteHistory,
  getAllHistory,
  updateHistory,
} from 'src/controllers/historyController';
import { setCloudinaryFolder, uploadImgMain } from 'src/controllers/uploadController';

const router = express.Router();

router
  .route('/')
  .get(getAllHistory)
  .post(protect, restrictTo('admin'), uploadImgMain, setCloudinaryFolder('History'), createHistory);

router
  .route('/:id')
  .delete(protect, restrictTo('admin'), deleteHistory)
  .patch(
    protect,
    restrictTo('admin'),
    uploadImgMain,
    setCloudinaryFolder('History'),
    updateHistory,
  );

export default router;
