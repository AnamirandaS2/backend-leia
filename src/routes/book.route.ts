import cors from 'cors';
import { Router } from 'express';
import fileupload from 'express-fileupload';

import { addBook, deleteBook, queryBooks, updateBook, getBook, updateReadings, getReadings } from '../controllers/book.controller';
import checkBook from '../middlewares/book/checkBook';
import checkToken from '../middlewares/user/checkToken';
import { updateBookSchema } from '../schemas/ book.schema';
import verifyShape from '../utils/verifyShape';

const router = Router();

router.use(fileupload());

router.options('/update-reading-list/:id', cors());
// http;//clubedaleitura.com/book/
router.get('/books?:author?:from?:to?:genre?:minPages?:maxPages', queryBooks);
router.get('/:id', checkBook, getBook);

router.post('', checkToken, addBook);

router.put('/:id', verifyShape(updateBookSchema), checkToken, checkBook, updateBook);
router.delete('/:id', checkToken, checkBook, deleteBook);
router.post('/update-reading-list/:id', cors(), checkToken, checkBook, updateReadings);
router.get('/last-readings', checkToken, getReadings);
export default router;