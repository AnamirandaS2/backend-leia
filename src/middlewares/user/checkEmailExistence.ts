import { NextFunction, Request, Response } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkEmailExistence(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body as { email: string };
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new AppError('Email não cadastrado!', 404);

  req.user = { ...user };
  return next();
}