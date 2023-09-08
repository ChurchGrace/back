import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken-promisified';
import sendEmail from 'src/email';
import User from 'src/models/UserModel';
import AppError from 'src/utils/AppError';
import { catchAsync } from 'src/utils/catchAsync';

const singJwt = async (id: string) => {
  return await jwt.signAsync({ id: id }, `${process.env.JWT_SECRET}`, {
    expiresIn: `${process.env.JWT_EXPIRES_IN}`,
  });
};

const sendJwtToken = async (user: string, statusCode: number, res: Response) => {
  const token = await singJwt(user);

  res.status(statusCode).json({
    status: 'success',
    token,
  });
};

export const singin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  await sendJwtToken(newUser.id, 201, res);
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return next(new AppError('Password and email are required', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Incorrect login or password', 400));
  }

  await sendJwtToken(user.id, 200, res);
});

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Please login', 401));
  }

  const decoded = (await jwt.verifyAsync(token, `${process.env.JWT_SECRET}`)) as {
    id: string;
    iat: number;
    exp: number;
  };

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError('Please singin', 401));
  }

  if (user.isPasswordChanged(decoded.iat)) {
    return next(new AppError('The data has been changed. Please login', 401));
  }
  req.body.user = user;

  return next();
});

export const forgetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    const passwordToken = user.getPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    const message = `To reset your password follow the link: ${process.env.RESET_URL}/resetPassword/${passwordToken}`;

    try {
      await sendEmail({ to: user.email, subject: 'Your password reset link', text: message });
      res.status(200).json({
        status: 'success',
        message: 'Please check email',
      });
    } catch {
      user.passwordToken = undefined;
      user.passwordTokenExpiresIn = undefined;
      await user.save({ validateBeforeSave: false });
      res.status(500).json({
        status: 'error',
        message: 'Failed to send data to your email',
      });
    }
  },
);

export const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const passwordHash = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    passwordToken: passwordHash,
    passwordTokenExpiresIn: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('User does not exist', 404));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordToken = undefined;
  user.passwordTokenExpiresIn = undefined;

  await user.save();

  await sendJwtToken(user.id, 200, res);
});

export const updateMyPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.body.user._id).select('+password');

    if (!req.body.password) {
      return next(new AppError('Enter password', 400));
    }

    if (!user || !(await user.comparePassword(req.body.password))) {
      return next(new AppError('Wrong password', 401));
    }

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.passwordConfirm;

    await sendJwtToken(user.id, 200, res);
  },
);

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.body.user.role)) {
      return next(new AppError('You do not have permission to do this', 403));
    }
    next();
  };
};
