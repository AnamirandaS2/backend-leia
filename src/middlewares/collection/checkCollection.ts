import { Request, Response, NextFunction } from 'express';
import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkCollection(req: Request, res: Response, next: NextFunction) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: req.params.id,
      userId: req.user.id
    },
    select: {
      id: true
    }
  });

  if (!collection) throw new AppError('Colleção não encontrada', 404);

  next();
}