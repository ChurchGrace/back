import express from 'express';
import { protect, restrictTo } from 'src/controllers/authController';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from 'src/controllers/postsController';
import { setCloudinaryFolder, uploadImgMain } from 'src/controllers/uploadController';

const router = express.Router();

router
  .route('/')
  .get(getAllPosts)
  .post(protect, restrictTo('admin'), uploadImgMain, setCloudinaryFolder('Posts'), createPost);

router
  .route('/:id')
  .get(getPostById)
  .delete(protect, restrictTo('admin'), deletePost)
  .patch(protect, restrictTo('admin'), uploadImgMain, setCloudinaryFolder('Posts'), updatePost);

export default router;
