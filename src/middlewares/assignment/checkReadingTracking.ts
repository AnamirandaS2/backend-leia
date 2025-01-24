import { ReadingTracking } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkReadingTracking(req: Request, res: Response, next: NextFunction) {
  const { bookId } = req.body;

  const book = await prisma.readingTracking.findFirst({
    where: {
      bookId,
      userId: req.user.id,
    },
    select: {
      page: true,
    }
  });

  if (!book) throw new AppError('Usuário nem sequer começou a ler o livro', 404);

  req.readingTracking = { ...book } as ReadingTracking;

  next();
}