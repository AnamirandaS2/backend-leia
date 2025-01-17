import { NextFunction, Request, Response } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkParamsId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if(!id) throw new AppError('Id do usuário não informado', 401);

  const user = await prisma.user.findUnique({ where: { id } });
  
  if (!user) throw new AppError('Usuário não encontrado', 404);

  return next();
}