import { Router } from 'express';
import { fetchReview, putReview, queryReviews, sendReview, createReview } from '../controllers/review.controller';
import verifyShape from '../utils/verifyShape';
import { createReviewSchema } from '../schemas/review.schema';
import checkToken from '../middlewares/user/checkToken';
import checkCreationAvailable from '../middlewares/review/checkCreationAvailable';
import checkReviewIsFromUser from '../middlewares/review/checkReviewIsFromUser';

const router = Router();

///
router.get('/reviews?:bookTitle?:reviewTitle?:bookAuthor?:userName?:from?:to', checkToken, queryReviews);
router.get('/:id', fetchReview);
router.post('', verifyShape(createReviewSchema), checkToken, checkCreationAvailable, createReview);
router.post('/send?:reviewId', checkToken, checkReviewIsFromUser, sendReview);
router.put('/:id', putReview);

export default router;