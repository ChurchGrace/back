import { UploadApiOptions } from 'cloudinary';
import { nanoid } from 'nanoid';
import { promisify } from 'util';
import { Request } from 'express';
import cloudinary from 'src/cloudinary';
import streamifier from 'streamifier';

export const uploadFromBufferArray = async (req: Request) => {
  const files = req.files as { imgs: Express.Multer.File[] };
  if (files.imgs.length === 1) {
    const res = await uploadFromBuffer(files.imgs, req);
    return [res];
  }

  return await Promise.all(
    files.imgs.map(currentFile => {
      const options = {
        folder: req.body.folder,
        public_id: `file-${nanoid()}-${Date.now()}`,
        transformation: [{ quality: '50', fetch_format: 'auto' }],
      };
      return uploadPhotos(options, currentFile);
    }),
  );
};

export const uploadFromBuffer = async (file: Express.Multer.File[], req: Request) => {
  const currentFile = file[0];

  let options = {
    transformation: [{ quality: '50', fetch_format: 'auto' }],
  } as UploadApiOptions;

  if (req.body.photoId) {
    options.public_id = req.body.photoId;
  } else {
    options.folder = req.body.folder;
    options.public_id = `file-${nanoid()}-${Date.now()}`;
  }

  return uploadPhotos(options, currentFile);
};

const uploadPhotos = (options: UploadApiOptions, file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      options,
      (error: unknown, result: unknown) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      },
    );

    streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
  });
};

export const destroyImg = async (id: string) => {
  return promisify(cloudinary.uploader.destroy)(id);
};
