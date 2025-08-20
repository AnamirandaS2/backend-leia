import { Request, Response } from 'express';

import getAdminEmailsService from '../services/admin/getAdminEmails.service';
import createReviewService from '../services/review/createReview.service';
import findReviewService from '../services/review/findReview.service';
import queryReviewsService from '../services/review/queryReviews.service';
import sendReviewService from '../services/review/sendReview.service';
import updateReviewService from '../services/review/updateReview.service';

export async function fetchReview(req: Request, res: Response) {
  const { id, title } = req.review;
  
  const review = await findReviewService(id as string);

  return res.status(200).json({ review, title });
}

export async function createReview(req: Request, res: Response) {
  const { bookId, borrowDate, returnDate, visibility } = req.body as { bookId: string; borrowDate: string; returnDate: string; visibility?: 'PUBLIC' | 'PROFESSOR_ONLY' };

  const { id: userId } = req.user as { id: string };

  const review = await createReviewService({ bookId, userId, borrowDate, returnDate, visibility });

  return res.status(201).json(review);
}

export async function updateReview(req: Request, res: Response) {
  const { newTitle, newContent } = req.body as { newTitle?: string; newContent?: string };
  const { name: reviewerName } = req.user as { name: string };
  const { title, id: reviewId } = req.review as { title: string; id: string };
  await updateReviewService({ newTitle, newContent, reviewerName, title, reviewId });

  return res.status(200).json({ message: 'Review updated' });
}

export async function sendReview(req: Request, res: Response) {
  const emails = await getAdminEmailsService();
  const { user, review } = req;
  
  await sendReviewService({ emails, review, user });
  
  return res.status(200).json({ message: 'sendReview' });
}

interface Queries {
    reviewTitle: string;
    userName: string;
    from: string;
    to: string;
    bookTitle: string;
    bookAuthor: string;
}

export async function queryReviews(req: Request, res: Response) {
  const queries = req.query as unknown as Queries & { bookId?: string };
  const { role, id } = req.user as { role: 'USER' | 'PROFESSOR' | 'ADMIN'; id: string };
  const reviews = await queryReviewsService({
    ...queries,
    bookId: (req.query as any).bookId,
    requesterRole: role,
    requesterId: id,
  });

  return res.status(200).json(reviews); 
}
