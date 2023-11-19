import { Router } from 'express';
import ActivityController from '../controllers/ActivityController';

const router = Router();

router.put('/:id', ActivityController.Updata);

export default router;