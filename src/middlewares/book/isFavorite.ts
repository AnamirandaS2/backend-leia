import { Request, Response, NextFunction } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default function checkFavorite(shouldBeFavorite: boolean) {
  return async function isFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { book } = req;
    const { user } = req;

    const isFavorite = await prisma.favoritedBooks.findFirst({
      where: {
        userId: user.id,
        bookId: book.id,
      },
    });

    if (!isFavorite && shouldBeFavorite) {
      throw new AppError('Livro deve ter sido favoritado primeiro', 400);
    }

    if (isFavorite && !shouldBeFavorite) {
      throw new AppError('Livro já foi favoritado', 400);
    }

    return next();
  };
}