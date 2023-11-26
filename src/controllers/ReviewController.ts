import { Request, Response } from "express";
import createReviewService from "../services/review/createReview.service";
import findReviewByIdService from "../services/review/findReviewById.service";

export async function fetchReview(req: Request, res: Response) {
    const reviewId  = req.params;
    const review = await findReviewByIdService(reviewId.toString())

    return res.status(200).json(review);
}

export async function createReview(req: Request, res: Response) {
    const { bookId, title, content } = req.body;
    const { id: userId } = req.user;
    const { name } = req.user;
    const review = await createReviewService({ bookId, title, content, userId, name });

    return res.status(201).json(review);
}

export async function putReview(req: Request, res: Response) {

}

export async function sendReview(req: Request, res: Response) {

}

export async function queryReviews(req: Request, res: Response) {

}
