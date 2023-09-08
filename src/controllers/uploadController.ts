import multer from 'multer';
import AppError from 'src/utils/AppError';
import { Request, NextFunction, Response } from 'express';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      return cb(null, true);
    } else {
      return cb(new AppError('Wrong file', 400));
    }
  },
});

export const setCloudinaryFolder = (FolderName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body.folder = FolderName;

    return next();
  };
};

export const uploadImgCover = upload.fields([
  {
    name: 'imgCover',
    maxCount: 1,
  },
]);

export const uploadImgMain = upload.fields([
  {
    name: 'imgMain',
    maxCount: 1,
  },
]);

export const uploadAllImgs = upload.fields([
  {
    name: 'imgCover',
    maxCount: 1,
  },
  {
    name: 'imgMain',
    maxCount: 1,
  },
  {
    name: 'imgs',
    maxCount: 3,
  },
]);
