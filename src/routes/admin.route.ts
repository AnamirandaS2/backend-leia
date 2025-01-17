import { Router } from 'express';

import { approveUser, fetchAllUsers, fetchNonApprovedUsers, fetchUsers, getUser, rejectUser } from '../controllers/admin.controller';
import { registerController } from '../controllers/user.controller';
import checkReviewExists from '../middlewares/review/checkReviewExists';
import checkEmailAvailability from '../middlewares/user/checkEmailAvailability';
import checkParamsId from '../middlewares/user/checkParamsId';
import checkPermission from '../middlewares/user/checkPermission';
import checkToken from '../middlewares/user/checkToken';
import { registerSchema } from '../schemas/admin.schema';
import verifyShape from '../utils/verifyShape';

const router = Router();

const checkIsAdmin = checkPermission(['ADMIN']);
const checkIsProfessorOrAdmin = checkPermission(['PROFESSOR', 'ADMIN']);

router.post('/register', verifyShape(registerSchema), checkToken, checkIsAdmin, checkEmailAvailability, registerController);
router.get('/non-approved-users', checkToken, checkIsProfessorOrAdmin, fetchNonApprovedUsers);
router.post('/approve-review/:id', checkToken, checkIsProfessorOrAdmin, checkReviewExists);
router.post('/approve-user/:id', checkToken, checkIsProfessorOrAdmin, checkParamsId, approveUser);
router.post('/reject-user/:id', checkToken, checkIsProfessorOrAdmin, checkParamsId, rejectUser);
router.get('/approved-users', checkToken, checkIsProfessorOrAdmin, fetchUsers);
router.get('/user/:reviewId', checkToken, checkIsProfessorOrAdmin, checkReviewExists, getUser);
router.get('/all-users', checkToken, checkIsProfessorOrAdmin, fetchAllUsers);

export default router;