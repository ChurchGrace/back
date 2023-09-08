import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import ApiFeatures from 'src/utils/ApiFeatures';
import AppError from 'src/utils/AppError';
import { catchAsync } from 'src/utils/catchAsync';
import { isSaveInCloudinary } from 'src/utils/saveInCloudinary';

export const updateOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new AppError('Document not found', 404));
    }

    if (await isSaveInCloudinary(req)) {
      const updateObj = { ...req.body };
      delete updateObj['imgs'];

      document = await Model.findByIdAndUpdate(document?.id, updateObj, {
        runValidators: true,
        new: true,
      });

      if (req.body.imgs) {
        const imgObj = req.body.imgs[0];

        document = await Model.findOneAndUpdate(
          { 'imgs.img': imgObj.img },
          {
            $set: {
              'imgs.$.url': imgObj.url,
            },
          },
          {
            runValidators: true,
            new: true,
          },
        );
      }
    }

    res.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

export const getAll = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const reqObj = await new ApiFeatures(Model, req.query).filter();

    const documents = await reqObj.paginate().sort().limitFields().query.clone();

    res.status(200).json({
      status: 'success',
      totalPages: reqObj.countTotalPages(),
      currentPage: reqObj.currentPage,
      results: documents.length,
      data: {
        documents,
      },
    });
  });

export const getOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      return next(new AppError('Document not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

export const getFirst = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const document = await Model.findOne();

    if (!document) {
      return next(new AppError('Document not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

export const deleteOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new AppError('Document not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

export const createOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let document = await Model.create(req.body);

    if (await isSaveInCloudinary(req)) {
      document = await Model.findByIdAndUpdate(document.id, req.body, {
        runValidators: true,
        new: true,
      });
    }

    res.status(201).json({
      status: 'success',
      data: {
        document,
      },
    });
  });
