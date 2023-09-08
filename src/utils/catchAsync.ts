import { Response, Request, NextFunction } from 'express';

export const catchAsync =
  (fun: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fun(req, res, next).catch(err => next(err));
  };
