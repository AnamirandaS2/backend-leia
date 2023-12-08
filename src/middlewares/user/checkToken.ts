import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) throw new AppError('Token não informado', 401);
    
  const [ , token ] = authorization.split(' ');

  if(!token) throw new AppError('Token não informado', 401);
  req.user = {};  
  try {
    req.user.id = (verify(token, process.env.JWT_SECRET) as {id: string}).id;
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