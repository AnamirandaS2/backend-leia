import { NextFunction, Request, Response } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';
import parseFilename from '../../utils/parseFilename';

export default async function insertIdBook(req: Request, res: Response, next: NextFunction)
{

  const { nameBook } = req.body;
  const nameBook_Form = parseFilename('', nameBook);
  
  const bookId = await prisma.book.findFirst({ where: { title : nameBook_Form }, select: { id : true }});

  if (!bookId) throw new AppError('Livro não encontrado: Talvez o nome esteja errado', 404);

  req.body.bookId = bookId.id;

  return next();
}