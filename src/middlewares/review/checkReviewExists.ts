import { NextFunction, Request, Response } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkReviewExists(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw new AppError('Review not found', 404);

  req.review = review;
  
  const user = await prisma.user.findUnique({ where: { id: review.userId } });
  req.user = user;

  return next();
}