import { Request, Response } from 'express';
import createReviewService from '../services/review/createReview.service';
import findReviewByIdService from '../services/review/findReviewById.service';
import queryReviewsService from '../services/review/queryReviews.service';

export async function fetchReview(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const review = await findReviewByIdService(id);

    return res.status(200).json(review);
}

export async function createReview(req: Request, res: Response) {
    const { bookId, title, content } = req.body;
    const { id: userId } = req.user;
    const { name } = req.user;
    const review = await createReviewService({ bookId, title, content, userId, name });

    return res.status(201).json(review);
}

export async function putReview() {

}

export async function sendReview(req: Request, res: Response) {
    return res.status(200).json({ message: 'sendReview' });
}

interface Queries {
    reviewTitle: string
    userName: string
    from: string
    to: string
    bookTitle: string
    bookAuthor: string
}

export async function queryReviews(req: Request, res: Response) {
    const queries = req.query as unknown as Queries;
    const reviews = await queryReviewsService(queries);

    return res.status(200).json(reviews); 
}
