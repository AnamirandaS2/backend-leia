import { Request, Response, NextFunction } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';

export async function checkBookInCollection(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { bookId } = req.body;

  const book = await prisma.collection.findFirst({ 
    where: { 
      id: req.params.id,
      books: {
        some: {
          id: bookId
        }
      }
    } 
  });

  if(!book) throw new AppError('Livro não pertence à coleção', 404);

  req.book = book;

  return next();
}