import { Router } from 'express';
import verifyShape from '../utils/verifyShape';
import { supportSchema } from '../schemas/support.schema'; 
import { supportController } from '../controllers/support.controller';

const support = Router();

support.post('', verifyShape(supportSchema), supportController);

export default support;