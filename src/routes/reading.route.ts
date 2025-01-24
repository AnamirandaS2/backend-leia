import { Router } from 'express';

import { startReading, updateReading, getPage, deleteReading, getReadings } from '../controllers/reading.controller';
import checkBook from '../middlewares/book/checkBook';
import checkToken from '../middlewares/user/checkToken';
import { updatereadingSchema, createDeadlineSchema } from '../schemas/reading.schema';
import verifyShape from '../utils/verifyShape';
import checkReading from '../middlewares/reading/checkReading';

const router = Router();

router.put('/:id', verifyShape(updatereadingSchema), checkToken, checkBook, checkReading(true), updateReading);
router.get('/:id', checkToken, checkBook, checkReading(true), getPage);
router.post('/:id', verifyShape(createDeadlineSchema), checkToken, checkBook, checkReading(false), startReading)
router.delete('/:id', checkToken, checkBook, checkReading(true), deleteReading)
router.get('/', checkToken, getReadings)

export default router;