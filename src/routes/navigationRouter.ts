import { protect, restrictTo } from './../controllers/authController';
import express from 'express';
import { createNavigation, getNavigation } from 'src/controllers/navigationController';

const router = express.Router();

router.route('/').get(getNavigation).post(protect, restrictTo('admin'), createNavigation);

export default router;
