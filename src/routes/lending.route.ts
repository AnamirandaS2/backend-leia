import { Role } from '@prisma/client';
import { Router } from 'express';

import { approveRequest, approveExtensionRequest, getPendencies, getPendenciesById, rejectRequest, rejectExtensionRequest, requestExtension, requestLending, returnBook } from '../controllers/lending.controller';
import { checkBook, checkLendingFromUser, checkLendingExists, checkRequest } from '../middlewares/lending/';
import checkExtensionRequest from '../middlewares/lending/checkExtensionRequest';
import checkPermission from '../middlewares/user/checkPermission';
import checkToken from '../middlewares/user/checkToken';
import { lendingExtensionSchema, requestLendingSchema } from '../schemas/borrow.schema';
import verifyShape from '../utils/verifyShape';

const router = Router();
const isProfessorOrAdmin = checkPermission([Role.ADMIN, Role.PROFESSOR]);

router.post('/request', verifyShape(requestLendingSchema), checkToken, checkBook, requestLending);
router.post('/approve/:requestId', checkToken, isProfessorOrAdmin, checkRequest, approveRequest);
router.post('/reject/:requestId', checkToken, isProfessorOrAdmin, checkRequest, rejectRequest);
router.post('/extension/request', verifyShape(lendingExtensionSchema), checkToken, checkLendingFromUser, requestExtension);
router.post('/extension/approve/:requestId', checkToken, isProfessorOrAdmin, checkExtensionRequest, approveExtensionRequest),
router.post('/extension/reject/:requestId', checkToken, isProfessorOrAdmin, checkExtensionRequest, rejectExtensionRequest); 
router.put('/return/:lendingId', checkToken, checkLendingExists, isProfessorOrAdmin, checkLendingExists, returnBook);
router.get('/pendencies', checkToken, getPendenciesById);
router.get('/pendencies/all', checkToken, isProfessorOrAdmin, getPendencies);
  
export default router;