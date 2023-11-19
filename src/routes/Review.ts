import { Router } from "express";
import ReviewController from '../controllers/ReviewController';

const router = Router();

router.get('/:id', ReviewController.PickUpReview);
router.post('/:book_id', ReviewController.AddReview);
router.put('/:id', ReviewController.UpdateReview);
router.get('/?', ReviewController.FindReviews);

export default router;