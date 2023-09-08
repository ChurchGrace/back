import { Request, Response } from 'express';
import { protect, restrictTo } from './../controllers/authController';
import express from 'express';

const router = express.Router();

router.route('/').get(protect, restrictTo('admin'), (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
  });
});

export default router;
