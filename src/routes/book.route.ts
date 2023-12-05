import { Router } from 'express';
import checkTokenAdmin from '../middlewares/admin/checkTokenAdmin';
import checkBook from '../middlewares/book/checkBook'
import storage from '../middlewares/multerConfig';
import multer from 'multer';
import { addBook, deleteBook, filterBook, downloadBook, viewBook, updateBook,  } from '../controllers/book.controller';

const router = Router();
const upload = multer({ storage: storage });

// http;//clubedaleitura.com/book/
router.get('/view', checkBook, viewBook);
router.get('/download', checkBook, downloadBook);
router.get('/?author=&date=&quantity=', filterBook);

// enctype="multipart/form-data" no formulario do front
router.post('', checkTokenAdmin, upload.fields([{name:'book', maxCount: 1}, {name:'cover', maxCount:1}]), addBook);

router.put('/:id', updateBook);
router.delete('/:id', deleteBook);


export default router;