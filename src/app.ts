import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from './error';
import activity from './routes/reading.route';
import admin from './routes/admin.route';
import book from './routes/books.route';
import lending from './routes/lending.route';
import posts from './routes/posts.route';
import review from './routes/review.route.';
import support from './routes/support.route';
import user from './routes/user.route';
import swaggerDocs from './swagger-output.json';
import collections from './routes/collections.route';
import assignments from './routes/assignments.route';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname  }/images`));


const css = fs.readFileSync(
  path.resolve(__dirname, '../node_modules/swagger-ui-dist/swagger-ui.css'),
  'utf8'
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { customCssUrl: css }));

app.use('/user', user);
app.use('/admin', admin);
app.use('/books', book);
app.use('/reading', activity);
app.use('/review', review);
app.use('/support', support);
app.use('/lending', lending);
app.use('/posts', posts);
app.use('/collections', collections);
app.use('/assignments', assignments)

app.use(errorHandler);

export default app;