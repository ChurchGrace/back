import { Request } from 'express';
import { uploadFromBuffer, uploadFromBufferArray } from './uploadPhotos';
import { IReqFiles, ISavedRes } from 'src/types/uploadTypes';

export const isSaveInCloudinary = async (req: Request) => {
  const obj = (req.files as unknown as IReqFiles) || {};

  if ('imgs' in obj) {
    const items = (await uploadFromBufferArray(req)) as ISavedRes[];
    req.body.imgs = items.map(i => ({ url: i.secure_url, img: i.public_id }));
  }

  if ('imgMain' in obj) {
    const imgMain = (await uploadFromBuffer(obj.imgMain, req)) as ISavedRes;
    req.body.imgMain = { url: imgMain.secure_url, img: imgMain.public_id };
  }

  if ('imgCover' in obj) {
    const imgCover = (await uploadFromBuffer(obj.imgCover, req)) as ISavedRes;
    req.body.imgCover = { url: imgCover.secure_url, img: imgCover.public_id };
  }

  return Object.keys(obj).some(elem => elem in req.body);
};
