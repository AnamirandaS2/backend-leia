import { Router } from 'express';

import { fetchReview, updateReview, queryReviews, sendReview, createReview } from '../controllers/review.controller';
import checkBook from '../middlewares/book/checkBook';
import checkCreationAvailable from '../middlewares/review/checkCreationAvailable';
import checkReviewExists from '../middlewares/review/checkReviewExists';
import checkReviewIsFinished from '../middlewares/review/checkReviewIsFinished';
import checkReviewIsFromUser from '../middlewares/review/checkReviewIsFromUser';
import checkToken from '../middlewares/user/checkToken';
import { createReviewSchema, updateReviewSchema } from '../schemas/review.schema';
import verifyShape from '../utils/verifyShape';

const router = Router();

router.get('/reviews?:bookTitle?:reviewTitle?:bookAuthor?:userName?:from?:to', checkToken, queryReviews);
router.put('/:reviewId', verifyShape(updateReviewSchema), checkToken, checkReviewIsFromUser, updateReview);
router.get('/:id', checkReviewExists, fetchReview);
router.post('', verifyShape(createReviewSchema), checkToken, checkBook, checkCreationAvailable, createReview);
router.post('/:reviewId', checkToken, checkReviewIsFromUser, checkReviewIsFinished, sendReview);

export default router;