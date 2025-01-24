import { Router } from 'express';

import { createPost, fetchPost, likePost, fetchPostByUser, addComment, fetchComments, deleteComment, deletePost } from '../controllers/posts.controller';
import checkPost from '../middlewares/post/checkPost';
import checkReadingTracking from '../middlewares/post/checkReadingTracking';
import checkToken from '../middlewares/user/checkToken';
import { postCommentSchema, postsSchema } from '../schemas/posts.schema'; 
import verifyShape from '../utils/verifyShape';
import checkComment from '../middlewares/post/checkComment';
import checkPostIsFromUser from '../middlewares/post/checkPostIsFromUser';

const posts = Router();

posts.post('', verifyShape(postsSchema), checkToken, checkReadingTracking, createPost);
posts.get('/:id', checkPost, fetchPost); 
posts.put('/like/:id', checkToken, checkPost, likePost);
posts.get('/', checkToken, fetchPostByUser);
posts.post('/comment/:id', verifyShape(postCommentSchema), checkToken, checkPost, addComment)
posts.get('/comment/:id', checkPost, fetchComments);
posts.delete('/comment/:id', checkToken, checkComment, deleteComment)
posts.delete('/:id', checkToken, checkPost, checkPostIsFromUser, deletePost)

export default posts;