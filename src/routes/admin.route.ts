import { Router } from 'express';

import { loginController, registerController } from '../controllers/admin.controller';
import checkAdvancedAdminPermission from '../middlewares/admin/checkAdvancedAdminPermission';
import checkEmailAvailability from '../middlewares/checkEmailAvailability';
import checkLogin from '../middlewares/checkLogin';
import checkTokenAdmin from '../middlewares/admin/checkTokenAdmin';
import checkReviewExists from '../middlewares/review/checkReviewExists';
import { loginSchema, registerSchema } from '../schemas/user.schema';
import verifyShape from '../utils/verifyShape';

const useRouter = Router();

useRouter.post('/register', verifyShape(registerSchema), checkTokenAdmin, checkAdvancedAdminPermission,checkEmailAvailability, registerController);
useRouter.post('/login', verifyShape(loginSchema), checkLogin, loginController);
useRouter.get('', checkTokenAdmin);
useRouter.post('/approve/:id', checkTokenAdmin, checkReviewExists);

export default useRouter;