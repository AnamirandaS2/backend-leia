import { Router } from 'express';

import { upsertPage } from '../controllers/activity.controller';
import checkToken from '../middlewares/admin/checkTokenAdmin';
import checkBook from '../middlewares/book/checkBook';
import { activitySchema } from '../schemas/activity.schema';
import verifyShape from '../utils/verifyShape';

const router = Router();

router.put('/:id', verifyShape(activitySchema), checkToken, checkBook, upsertPage);
router.get('/:id', checkToken, checkBook, upsertPage);

export default router;