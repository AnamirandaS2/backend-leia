import { Router } from 'express';

import { supportController } from '../controllers/support.controller';
import { supportSchema } from '../schemas/support.schema'; 
import verifyShape from '../utils/verifyShape';

const support = Router();

support.post('', verifyShape(supportSchema), supportController);

export default support;