import { Request, Response, NextFunction } from 'express';
import prisma from '../../database/db';
import { AppError } from '../../error';

export default function checkReading(shouldAlreadyBeReading: boolean) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.body;
    const { id } = req.user
  
    const reading = await prisma.readingTracking.findFirst({
      where: {
        bookId,
        userId: id
      },
      select: {
        userId: true,
      }
    });
  
    if (reading && !shouldAlreadyBeReading) throw new AppError('Usuário já está lendo o livro', 400);
    if (!reading && shouldAlreadyBeReading) throw new AppError('Usuário não está lendo o livro', 400);
  
    next();

  }
}