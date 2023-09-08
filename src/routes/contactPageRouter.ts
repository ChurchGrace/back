import { protect, restrictTo } from './../controllers/authController';
import express from 'express';
import {
  createContactPage,
  getContactPage,
  updateContactPage,
} from 'src/controllers/contactController';
import { setCloudinaryFolder, uploadImgMain } from 'src/controllers/uploadController';

const router = express.Router();

router
  .route('/')
  .get(getContactPage)
  .post(
    protect,
    restrictTo('admin'),
    uploadImgMain,
    setCloudinaryFolder('Contacts'),
    createContactPage,
  );

router
  .route('/:id')
  .patch(
    protect,
    restrictTo('admin'),
    uploadImgMain,
    setCloudinaryFolder('Contacts'),
    updateContactPage,
  );

export default router;
