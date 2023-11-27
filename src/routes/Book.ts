import { Router, Request, request } from 'express'
import BookController from '../controllers/BookController'
import checkTokenAdmin from '../middlewares/admin/checkTokenAdmin'
import storage from "../middlewares/multerConfig";
import multer from 'multer';

const router = Router();
const upload = multer({ storage: storage })

// http;//clubedaleitura.com/book/

router.get('/:id', BookController.PickUpBook)
router.get('/?author=&date=&quantity=', BookController.FilterBook);

// enctype="multipart/form-data" no formulario do front
router.post('', checkTokenAdmin, upload.fields([{name:'book', maxCount: 1}, {name:'cover', maxCount:1}]), BookController.AddBook)

router.put('/:id', BookController.UpdateBook)
router.delete('/:id', BookController.DeleteBook)


export default router;