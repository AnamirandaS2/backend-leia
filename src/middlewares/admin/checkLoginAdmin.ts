import { compare } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email, password } = req.body;

  const userAdmin = await prisma.admin.findFirst({ where: { email } });
  if(!userAdmin) throw new AppError('Email ou senha inválidos', 401);

  const isValidPassword = await compare(password, userAdmin.password);

  if(!isValidPassword) throw new AppError('Email ou senha inválidos', 401);

  req.admin = {
    id: userAdmin.id,
    name: userAdmin.name,
    email: userAdmin.email,
    authorityLevel: userAdmin.authorityLevel,
  };

  return next();
}