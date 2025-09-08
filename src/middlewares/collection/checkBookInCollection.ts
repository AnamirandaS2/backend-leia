import { Request, Response, NextFunction } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';

export async function checkBookInCollection(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { bookId } = req.body;

  // Verifica se o livro pertence à coleção e obtém o próprio livro
  const book = await prisma.book.findFirst({
    where: {
      id: bookId,
      collectionId: req.params.id,
    },
  });

  if (!book) throw new AppError('Livro não pertence à coleção', 404);

  req.book = book;

  return next();
}