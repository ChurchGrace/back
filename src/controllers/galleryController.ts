import { Request, Response, NextFunction } from 'express';
import Gallery from 'src/models/GalleryModel';
import AppError from 'src/utils/AppError';
import { catchAsync } from 'src/utils/catchAsync';
import { destroyImg } from 'src/utils/uploadPhotos';
import { createOne, getAll } from './handleFactory';

export const createPhoto = createOne(Gallery);
export const getAllPhotos = getAll(Gallery);

export const deletePhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const photo = await Gallery.findByIdAndDelete(req.params.id);

  if (!photo || !photo.imgMain) {
    return next(new AppError('Photo not found', 404));
  }

  await destroyImg(photo.imgMain.img!);

  res.status(200).json({
    status: 'success',
    data: {
      document: photo,
    },
  });
});
