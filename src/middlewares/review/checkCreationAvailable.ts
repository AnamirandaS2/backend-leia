import { NextFunction, Request, Response } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkCreationAvailable(req: Request, res: Response, next: NextFunction) {

  const { bookId } = req.body;
  const { id: userId } = req.user;
  const reviews = await prisma.review.findMany({ where: { bookId, userId  } });

  // the user can submit multiple reviews of the same book if they are not approved
  reviews.forEach(({ finished, approved }) => {
    if (!finished) throw new AppError('A review of this book is already in progress', 403);
    if (approved) throw new AppError('A review of this book was already made and approved', 403);
  });

  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) throw new AppError('Book not found', 404);
    
  return next();
}