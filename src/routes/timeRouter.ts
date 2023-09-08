import { protect, restrictTo } from './../controllers/authController';
import express from 'express';
import { createTime, deleteTime, getAllTime, updateTime } from 'src/controllers/timeController';

const router = express.Router();

router.route('/').get(getAllTime).post(protect, restrictTo('admin'), createTime);
router
  .route('/:id')
  .patch(protect, restrictTo('admin'), updateTime)
  .delete(protect, restrictTo('admin'), deleteTime);
export default router;
