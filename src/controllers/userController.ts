import { Request, Response, NextFunction } from 'express';
import { catchAsync } from 'src/utils/catchAsync';
import User from 'src/models/UserModel';
import AppError from 'src/utils/AppError';

export const updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const restrictFields = ['name', 'email'];
  const userInfo = { ...req.body };
  Object.keys(userInfo).forEach(item => {
    if (!restrictFields.includes(item)) {
      delete userInfo[item];
    }
  });

  if (!req.body.password) {
    return next(new AppError('Enter password', 400));
  }

  const user = await User.findById(req.body.user._id).select('+password');

  if (!user || !(await user.comparePassword(req.body.password))) {
    return next(new AppError('Wrong password', 403));
  }

  await User.findByIdAndUpdate(req.body.user._id, userInfo);

  res.status(200).json({
    status: 'success',
    data: {
      message: 'User updated',
    },
  });
});
