import { compare } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';
export default async function checkNewPasswordEqualsOld(req: Request, res: Response, next: NextFunction) {
  const { newPassword } = req.body;
  const { id } = req.user;
  const { password } = await prisma.user.findUnique({ where: { id }, select: { password: true }}) as { password: string };

  const isSame = await compare(newPassword, password);

  if (isSame) throw new AppError('A nova senha não pode ser igual à antiga', 400);

  return next();
}