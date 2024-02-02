import { Router } from 'express';

import { forgotPasswordController, loginController, registerController, resetPasswordController, updateController, validateToken } from '../controllers/user.controller';
import checkEmailAvailability from '../middlewares/user/checkEmailAvailability';
import checkEmailExistence from '../middlewares/user/checkEmailExistence';
import checkLogin from '../middlewares/user/checkLogin';
import checkParamsToken from '../middlewares/user/checkParamsToken';
import checkToken from '../middlewares/user/checkToken';
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, updateSchema } from '../schemas/user.schema';
import verifyShape from '../utils/verifyShape';

const useRouter = Router();

// register
useRouter.post('/register', verifyShape(registerSchema), checkEmailAvailability, registerController);

// login
useRouter.post('/login', verifyShape(loginSchema), checkLogin, loginController);

useRouter.post('/forgot-password', verifyShape(forgotPasswordSchema), checkEmailExistence, forgotPasswordController);
useRouter.post('/recuperar-senha/:token', verifyShape(resetPasswordSchema), checkParamsToken, resetPasswordController);

useRouter.put('', verifyShape(updateSchema), checkToken, updateController);
useRouter.get('/validate-token', validateToken);

export default useRouter;