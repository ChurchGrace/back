import express from 'express';
import {
  forgetPassword,
  login,
  protect,
  resetPassword,
  singin,
  updateMyPassword,
} from 'src/controllers/authController';
import { updateMe } from 'src/controllers/userController';

const router = express.Router();

router.route('/login').post(login);
router.route('/forgetPassword').post(forgetPassword);
router.route('/resetPassword/:token').post(resetPassword);

router.use(protect);
router.route('/updateMyPassword').patch(updateMyPassword);
router.route('/updateMe').patch(updateMe);

export default router;
