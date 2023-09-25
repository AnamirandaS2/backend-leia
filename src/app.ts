import 'express-async-errors'
import 'dotenv/config'
import { errorHandler } from './error'

import express from 'express'
const app = express()

app.use(errorHandler)
export default app