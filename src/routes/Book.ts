import { Router, Request, request } from 'express'
import BookController from '../controllers/BookController'

const router = Router();

// http;//clubedaleitura.com/book/

router.get('/:id?', BookController.PickUpBook)
router.get('/?author=&date=&quantity=', BookController.FilterBook);
router.post('/', BookController.AddBook)
router.put('/:id', BookController.UpdateBook)
router.delete('/:id', BookController.DeleteBook)


export default router;