import cors from 'cors';
import { Router } from 'express';
import fileupload from 'express-fileupload';

import { addBook, deleteBook, queryBooks, updateBook, getBook, updateReadings, getReadings } from '../controllers/book.controller';
import checkBook from '../middlewares/book/checkBook';
import checkPermission from '../middlewares/user/checkPermission';
import checkToken from '../middlewares/user/checkToken';
import { addBookSchema, updateBookSchema } from '../schemas/ book.schema';
import verifyShape from '../utils/verifyShape';

const isAdmin = checkPermission(['ADMIN', 'PROFESSOR']);

const router = Router();

router.use(fileupload());

router.options('/update-reading-list/:id', cors());
router.get('/books?:author?:from?:to?:genre?:minPages?:maxPages', queryBooks);
router.get('/:id', checkBook, getBook);
router.post('', verifyShape(addBookSchema), checkToken, isAdmin, addBook);
router.put('/:id', verifyShape(updateBookSchema), checkToken, isAdmin, checkBook, updateBook);
router.delete('/:id', checkToken, isAdmin, checkBook, deleteBook);
router.post('/update-reading-list/:id', cors(), checkToken, checkBook, updateReadings);
router.get('/last-readings', checkToken, getReadings);
export default router;