import { Router } from 'express';

import { createAssignment, fetchAssignment, likeAssignment, addComment, fetchComments, deleteComment, fetchAllAssignments, deleteAssignment } from '../controllers/assignment.controller';
import checkToken from '../middlewares/user/checkToken';
import verifyShape from '../utils/verifyShape';
import checkComment from '../middlewares/post/checkComment';
import checkAssignment from '../middlewares/assignment/checkAssignment';

import checkPermission from '../middlewares/user/checkPermission';
import { assignmentsSchema, assignmentCommentSchema } from '../schemas/assignments.schema';

const assignments = Router();

const isProfessorOrAdmin = checkPermission(['PROFESSOR', 'ADMIN']);

assignments.post('', verifyShape(assignmentsSchema), checkToken, isProfessorOrAdmin, createAssignment);
assignments.get('/:id', checkToken, checkAssignment, fetchAssignment); 
assignments.get('/', checkToken, fetchAllAssignments);
assignments.put('/like/:id', checkToken, checkAssignment, likeAssignment);
assignments.delete('/:id', checkToken, checkAssignment, isProfessorOrAdmin, deleteAssignment);
assignments.post('/comment/:id', verifyShape(assignmentCommentSchema), checkToken, checkAssignment, addComment)
assignments.get('/comment/:id', checkToken, checkAssignment, fetchComments);
assignments.delete('/comment/:id', checkToken, checkComment, deleteComment)

export default assignments;