import express, { Express } from 'express'
import 'express-async-errors'
import 'dotenv/config'
import { errorHandler } from './utils/error'
import User from './routes/user'
import Auth from './routes/Auth'
import Book from './routes/Book'
import Activity from './routes/Activity'
import Review from './routes/Review'


class App {
    readonly app: Express;
    constructor()
    {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares()
    {

    }
    
    routes() 
    {
        this.app.use('/user', User);
        this.app.use('/auth', Auth);
        this.app.use('/book', Book);
        this.app.use('/activity', Activity);
        this.app.use('/review', Review);
    }

    error()
    {
        this.app.use(errorHandler)
    }

}

export default new App().app;