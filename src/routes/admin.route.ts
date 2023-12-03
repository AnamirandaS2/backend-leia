import { Router } from 'express';
import verifyShape from '../utils/verifyShape';
import { loginSchema, registerSchema } from '../schemas/user.schema';
import checkEmailAvailability from '../middlewares/admin/checkEmailAvailability';
import { loginController, registerController } from '../controllers/admin.controller';
import checkLoginAdmin from '../middlewares/admin/checkLoginAdmin';
import checkTokenAdmin from '../middlewares/admin/checkTokenAdmin';

const useRouter = Router();

useRouter.post('', verifyShape(registerSchema), checkEmailAvailability, registerController);
useRouter.post('/login', verifyShape(loginSchema), checkLoginAdmin, loginController);

useRouter.get('', checkTokenAdmin);

export default useRouter;