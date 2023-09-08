import express from 'express';
import { protect, restrictTo } from 'src/controllers/authController';
import {
  createContactBlock,
  deleteContactBlock,
  getAllContactBlocks,
  updateContactBlock,
} from 'src/controllers/contactController';
import { setCloudinaryFolder, uploadImgMain } from 'src/controllers/uploadController';

const router = express.Router();

router
  .route('/')
  .get(getAllContactBlocks)
  .post(
    protect,
    restrictTo('admin'),
    uploadImgMain,
    setCloudinaryFolder('Contacts/Blocks'),
    createContactBlock,
  );

router
  .route('/:id')
  .patch(
    protect,
    restrictTo('admin'),
    uploadImgMain,
    setCloudinaryFolder('Contacts/Blocks'),
    updateContactBlock,
  )
  .delete(protect, restrictTo('admin'), deleteContactBlock);

export default router;
