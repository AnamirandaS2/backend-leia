import { Router } from 'express';

import { loginController, registerController } from '../controllers/admin.controller';
import checkEmailAvailability from '../middlewares/admin/checkEmailAvailability';
import checkLoginAdmin from '../middlewares/admin/checkLoginAdmin';
import checkTokenAdmin from '../middlewares/admin/checkTokenAdmin';
import { loginSchema, registerSchema } from '../schemas/user.schema';
import verifyShape from '../utils/verifyShape';

const useRouter = Router();

useRouter.post('', verifyShape(registerSchema), checkEmailAvailability, registerController);
useRouter.post('/login', verifyShape(loginSchema), checkLoginAdmin, loginController);

useRouter.get('', checkTokenAdmin);

export default useRouter;