import { MongoError } from 'mongodb';
import AppError from 'src/utils/AppError';

export const isSendEmailError = (err: unknown): err is { code: 'EENVELOPE' } => {
  return (err as { code: 'EENVELOPE' }).code === 'EENVELOPE';
};

export const isMongoDuplicateError = (err: unknown): err is MongoError => {
  return (err as MongoError).code === 11000;
};

export type TErrors = AppError | MongoError;
