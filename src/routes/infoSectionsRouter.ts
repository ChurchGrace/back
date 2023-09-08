import { protect, restrictTo } from '../controllers/authController';
import express from 'express';
import { createInfo, getInfo, updateInfo } from 'src/controllers/infoController';
import { setCloudinaryFolder, uploadImgCover } from 'src/controllers/uploadController';

const router = express.Router();

router
  .route('/')
  .get(getInfo)
  .post(
    protect,
    restrictTo('admin'),
    uploadImgCover,
    setCloudinaryFolder('InfoSection'),
    createInfo,
  );

router
  .route('/:id')
  .patch(
    protect,
    restrictTo('admin'),
    uploadImgCover,
    setCloudinaryFolder('InfoSection'),
    updateInfo,
  );

export default router;
