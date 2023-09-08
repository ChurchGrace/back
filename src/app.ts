import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
mongoose.connect(
  `${process.env.MONGO_DB_URL}`.replace('<PASSWORD>', `${process.env.MONGO_DB_PASSWORD}`),
);
import AppError from './utils/AppError';
import { errorController } from './controllers/errorController';
import postsRouter from './routes/postsRouter';
import userRouter from './routes/userRouter';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import ministryRouter from './routes/ministryRouter';
import navigationRouter from './routes/navigationRouter';
import pastorsRouter from './routes/pastorsRouter';
import galleryRouter from './routes/galleryRouter';
import sliderRouter from './routes/sliderRouter';
import infoSectionsRouter from './routes/infoSectionsRouter';
import timeRouter from './routes/timeRouter';
import contactPageRouter from './routes/contactPageRouter';
import contactBlockRouter from './routes/contactBlockRouter';
import historyRouter from './routes/historyRouter';
import dashboardRouter from './routes/dashboardRouter';
import footerRouter from './routes/footerRouter';
import socialRouter from './routes/socialRouter';
import cors from 'cors';
import contactFormRouter from './routes/contactFormRouter';

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.use(helmet());
app.use(mongoSanitize());
app.use(
  express.json({
    limit: '10kb',
  }),
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/navigation', navigationRouter);
app.use('/api/v1/contactPage', contactPageRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/ministry', ministryRouter);
app.use('/api/v1/gallery', galleryRouter);
app.use('/api/v1/pastors', pastorsRouter);
app.use('/api/v1/slider', sliderRouter);
app.use('/api/v1/contactBlocks', contactBlockRouter);
app.use('/api/v1/footer', footerRouter);
app.use('/api/v1/social', socialRouter);
app.use('/api/v1/infoSections', infoSectionsRouter);
app.use('/api/v1/time', timeRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/history', historyRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/contactForm', contactFormRouter);

app.all('*', (req, res, next) => {
  return next(new AppError('No such route', 404));
});

app.use(errorController);

export default app;
