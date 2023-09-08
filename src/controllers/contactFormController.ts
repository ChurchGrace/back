import { Request, Response } from 'express';
import sendEmail from 'src/email';
import { catchAsync } from 'src/utils/catchAsync';

export const sendContactForm = catchAsync(async (req: Request, res: Response) => {
  await sendEmail({
    to: req.body.email,
    subject: `Сообщение с сайта от ${req.body.username}`,
    text: req.body.text,
  });

  res.status(200).json({
    status: 'success',
    message: 'Please check email',
  });
});
