import { Router } from 'express';
import verifyShape from '../utils/verifyShape';
import { loginSchema, registerSchema } from '../schemas/user.schema';
import checkEmailAvailability from '../middlewares/user/checkEmailAvailability';
import { loginController, registerController } from '../controllers/user.controller.';
import checkLogin from '../middlewares/user/checkLogin';
import checkToken from '../middlewares/user/checkToken';

const useRouter = Router();

// register
useRouter.post('', verifyShape(registerSchema), checkEmailAvailability, registerController);

// login
useRouter.post('/login', verifyShape(loginSchema), checkLogin, loginController);

useRouter.get('', checkToken);

export default useRouter;