import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from './error';
import activity from './routes/activity.route';
import admin from './routes/admin.route';
import book from './routes/book.route';
import lending from './routes/lending.route';
import review from './routes/review.route.';
import support from './routes/support.route';
import useRouter from './routes/user.route';
import swaggerDocs from './swagger-output.json';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname  }/images`));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/user', useRouter);
app.use('/admin', admin);
app.use('/book', book);
app.use('/activity', activity);
app.use('/review', review);
app.use('/support', support);
app.use('/lending', lending);

app.use(errorHandler);

export default app;