import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';
import AppError from 'src/utils/AppError';
import { TErrors, isMongoDuplicateError, isSendEmailError } from 'src/types/errorsTypes';
import mongoose from 'mongoose';

const devErrors = (req: Request, res: Response, error: Error) => {
  let statusCode = 500;
  if ('statusCode' in error) {
    statusCode = error.statusCode as number;
  }
  return res.status(statusCode).json({
    err: error,
    message: error.message,
    stack: error.stack,
  });
};

const prodErrors = (req: Request, res: Response, error: Error) => {
  if ('statusCode' in error && 'status' in error && 'isOptional' in error && error.isOptional) {
    return res.status(error.statusCode as number).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const duplicateError = (err: MongoError) => {
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  return new AppError(`Duplicate field ${value}`, 400);
};

const sendEmail = () => {
  return new AppError(`Failed to find recipient`, 400);
};

export const errorController = (err: TErrors, req: Request, res: Response, next: NextFunction) => {
  if (isMongoDuplicateError(err)) {
    err = duplicateError(err);
  }

  if (err instanceof mongoose.Error.CastError) {
    err = new AppError(`Invalid id: ${err.value}`, 400);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const values = Object.values(err.errors).map(item => item.message);
    const message = values.join(' ');
    err = new AppError(message, 400);
  }

  if (isSendEmailError(err)) {
    err = sendEmail();
  }

  if (process.env.NODE_ENV === 'development') {
    return devErrors(req, res, err);
  }

  if (process.env.NODE_ENV === 'production') {
    return prodErrors(req, res, err);
  }
};
