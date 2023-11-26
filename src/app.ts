import express, { Express } from 'express'
import 'express-async-errors'
import 'dotenv/config'
import { errorHandler } from './error'
import Book from './routes/Book'
import Activity from './routes/Activity'
import Review from './routes/review.route.'
import Admin from './routes/Admin'
import useRouter from './routes/user.route'
import cors from 'cors'
import Suport from './routes/Suport'

const app = express();

app.use(cors())
app.use(express.json());

app.use('/user', useRouter);
app.use('/Admin', Admin)
app.use('/book', Book);
app.use('/activity', Activity);
app.use('/review', Review);
app.use('/suport', Suport);

app.use(errorHandler)


export default app;