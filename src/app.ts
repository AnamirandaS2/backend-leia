import cors from 'cors';
import express from 'express';

import 'express-async-errors';
import 'dotenv/config';
import { errorHandler } from './error';
import Activity from './routes/activity.route';
import Admin from './routes/admin.route';
import Book from './routes/book.route';
import Review from './routes/review.route.';
import support from './routes/support.route';
import useRouter from './routes/user.route';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname  }/images`));

app.use('/user', useRouter);
app.use('/Admin', Admin);
app.use('/book', Book);
app.use('/activity', Activity);
app.use('/review', Review);
app.use('/support', support);

app.use(errorHandler);

export default app;