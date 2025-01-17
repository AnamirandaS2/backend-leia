import { Request, Response, NextFunction } from 'express';

import prisma from '../../database/db';

export async function checkLendingExists(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { lendingId } = req.params;

  if (!lendingId) {
    res.status(400).json({ message: 'ID do empréstimo é necessário' });
    return;
  }

  const lending = await prisma.borrowedBook.findFirst({
    where: {
      id: lendingId
    },
    select: {
      id: true
    }
  });

  if (!lending) {
    res.status(404).json({ message: 'Empréstimo não encontrado' });
    return;
  }

  next();
}