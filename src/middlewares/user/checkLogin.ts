import { compare } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });
  if(!user) throw new AppError('Email ou senha inválidos', 401);

  const isValidPassword = await compare(password, user.password);

  if(!isValidPassword) throw new AppError('Email ou senha inválidos', 401);

  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return next();
}