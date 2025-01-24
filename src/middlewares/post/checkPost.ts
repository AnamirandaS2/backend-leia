import { NextFunction, Request, Response } from 'express';

import prisma from '../../database/db';

export default async function checkPost(req: Request, res: Response, next: NextFunction) {
  const post = await prisma.post.findFirst({
    where: {
      id: req.params.id,
      deletedAt: null,
    },
    select: {
      userId: true,
    }
  });

  if (!post) return res.status(404).json({ message: 'Post não encontrado' });

  next();
}