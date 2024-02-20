import { NextFunction, Request, Response } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkCreationAvailable(req: Request, res: Response, next: NextFunction) {

  const { bookId } = req.body;
  const { id: userId } = req.user;
  const reviews = await prisma.review.findMany({ where: { bookId, userId  } });
  console.log(bookId, userId, reviews);

  reviews.forEach(({ finished, approved }) => {
    if (!finished) throw new AppError('A review of this book is already in progress', 403);
    if (approved) throw new AppError('A review of this book was already made and approved', 403);
  });
    
  return next();
}