import { Router } from 'express';

import { loginController, registerController } from '../controllers/admin.controller';
import checkAdvancedAdminPermission from '../middlewares/admin/checkAdvancedAdminPermission';
import checkEmailAvailability from '../middlewares/admin/checkEmailAvailability';
import checkLoginAdmin from '../middlewares/admin/checkLoginAdmin';
import checkTokenAdmin from '../middlewares/admin/checkTokenAdmin';
import checkReviewExists from '../middlewares/review/checkReviewExists';
import { loginSchema, registerSchema } from '../schemas/user.schema';
import verifyShape from '../utils/verifyShape';

const useRouter = Router();

useRouter.post('', verifyShape(registerSchema), checkLoginAdmin, checkAdvancedAdminPermission, checkEmailAvailability, registerController);
useRouter.post('/login', verifyShape(loginSchema), checkLoginAdmin, loginController);
useRouter.get('', checkTokenAdmin);
useRouter.post('/approve/:id', checkTokenAdmin, checkReviewExists);

export default useRouter;