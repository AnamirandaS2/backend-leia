import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../error';
import prisma from '../../database/db';

export default async function checkReviewIsFromUser(req: Request, res: Response, next: NextFunction) {
    const { reviewId } = req.query as { reviewId: string };

    if (!reviewId) throw new AppError('Review id is required', 400);

    const { id } = req.user;

    const review = await prisma.review.findUnique({ where: { id: reviewId } });

    if (!review) throw new AppError('Review not found', 404);
    
    if (review.userId !== id) throw new AppError('You are not allowed to do this', 403);

    next();
}