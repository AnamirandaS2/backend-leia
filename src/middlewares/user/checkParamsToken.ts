import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkParamsToken(req: Request, res: Response, next: NextFunction) {
  const { token } = req.params;
    
  if(!token) throw new AppError('Token não informado', 401);
  
  try {
    const { id } = verify(token, process.env.JWT_SECRET) as unknown as { id: string };
    req.user = { id };
  } catch(err) {
    throw new AppError('Token inválido', 404);
  }

  const user = await prisma.user.findFirst({ where: { id: req.user.id } });

  if (!user) throw new AppError('Usuário não encontrado', 404);

  req.user = {
    ...req.user,
    email: user.email,
    name: user.name
  };
  
  return next();
}