import { Router } from 'express';
import multer from 'multer';

import { addBook, deleteBook, queryBooks, updateBook, getBook } from '../controllers/book.controller';
import checkBook from '../middlewares/book/checkBook';
import storage from '../middlewares/multerConfig';
import checkToken from '../middlewares/user/checkToken';
import { updateBookSchema } from '../schemas/ book.schema';
import verifyShape from '../utils/verifyShape';

const router = Router();
const upload = multer({ storage: storage });

// http;//clubedaleitura.com/book/
router.get('/books?:author?:from?:to?:genre?:minPages?:maxPages?:enabled', queryBooks);
router.get('/:id', checkBook, getBook);

// enctype="multipart/form-data" no formulario do front
router.post('', checkToken, upload.fields([{name:'book', maxCount: 1}, {name:'cover', maxCount:1}]), addBook);

router.put('/:id', verifyShape(updateBookSchema), checkToken, checkBook, updateBook);
router.delete('/:id', checkToken, checkBook, deleteBook);

export default router;