import { Router } from 'express';

import { approveUser, fetchNonApprovedUsers, fetchUsers, getUser, loginController, registerController, rejectUser } from '../controllers/admin.controller';
import checkAdvancedAdminPermission from '../middlewares/admin/checkAdvancedAdminPermission';
import checkReviewExists from '../middlewares/review/checkReviewExists';
import checkEmailAvailability from '../middlewares/user/checkEmailAvailability';
import checkLogin from '../middlewares/user/checkLogin';
import checkParamsId from '../middlewares/user/checkParamsId';
import checkToken from '../middlewares/user/checkToken';
import { loginSchema, registerSchema } from '../schemas/user.schema';
import verifyShape from '../utils/verifyShape';

const useRouter = Router();

useRouter.post('/register', verifyShape(registerSchema), checkToken, checkAdvancedAdminPermission, checkEmailAvailability, registerController);
useRouter.post('/login', verifyShape(loginSchema), checkLogin, loginController);
useRouter.get('', checkToken);
useRouter.get('/non-approved-users', checkToken, fetchNonApprovedUsers);
useRouter.post('/approve-review/:id', checkToken, checkReviewExists);
useRouter.post('/approve-user/:id', checkToken, checkParamsId, approveUser);
useRouter.post('/reject-user/:id', checkToken, checkParamsId, rejectUser);
useRouter.get('/users', checkToken, fetchUsers);
useRouter.get('/user/:reviewId', checkToken, checkReviewExists, getUser);

export default useRouter;