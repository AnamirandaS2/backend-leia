import { NextFunction, Request, Response } from 'express';

import prisma from '../../database/db';

export default async function checkAssignment(req: Request, res: Response, next: NextFunction) {
  const post = await prisma.assignment.findFirst({
    where: {
      id: req.params.id,
      deletedAt: null,
    },
    select: {
      professorId: true,
    }
  });

  if (!post) return res.status(404).json({ message: 'Atividade não encontrada' });

  next();
}