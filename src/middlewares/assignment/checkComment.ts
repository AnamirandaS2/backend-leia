import { NextFunction, Request, Response } from 'express';

import prisma from '../../database/db';

export default async function checkComment(req: Request, res: Response, next: NextFunction) {
  const comment = await prisma.postComment.findFirst({
    where: {
      id: req.params.id,
      deletedAt: null,
      OR: [
        { userId: req.user.id },
        { user: {
          role: {
            in: ['ADMIN', 'PROFESSOR']
          }
        }}
      ]
    },
    select: {
      userId: true,
    }
  });

  if (!comment) return res.status(404).json({ message: 'Comentário não encontrado' });

  next();
}