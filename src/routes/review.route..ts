import { Router } from "express";
import { fetchReview, putReview, queryReviews, sendReview, createReview } from '../controllers/ReviewController';
import verifyShape from "../utils/verifyShape";
import { createReviewSchema } from "../schemas/review.schema";
import checkToken from "../middlewares/user/checkToken";
import checkCreationAvailable from "../middlewares/review/checkCreationAvailable";

const router = Router();

router.get('/:id', fetchReview);
router.post('', verifyShape(createReviewSchema), checkToken, checkCreationAvailable, createReview)
router.post('/:id', sendReview);
router.put('/:id', putReview);
router.get('/?', queryReviews);

export default router;