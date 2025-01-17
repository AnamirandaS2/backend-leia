import { Request, Response, NextFunction } from 'express';

import prisma from '../../database/db';

export async function checkLendingFromUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { lendingId } = req.body;
  const { id } = req.user;

  if (!lendingId) {
    res.status(400).json({ message: 'ID do empréstimo é necessário' });
    return;
  }

  const lending = await prisma.borrowedBook.findFirst({
    where:{
      id: lendingId,
      userId: id
    },
  });

  if (!lending) {
    res.status(404).json({ message: 'Empréstimo não encontrado' });
    return;
  }

  next();
}