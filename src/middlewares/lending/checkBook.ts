import { Request, Response, NextFunction } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';

export async function checkBook(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { bookId } = req.body;

  const book = await prisma.book.findFirst({ where: { id: bookId } });
  if(!book) throw new AppError('Livro não encontrado', 404);

  req.book = book;

  return next();
}