import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) throw new AppError('Token não informado', 401);
    
  const [ , token ] = authorization.split(' ');
  if(!token) throw new AppError('Token não informado', 401);

  let userId = '';
  req.user = {};
  
  try {
    userId  = (verify(token, process.env.JWT_SECRET as string) as {id: string}).id;
  } catch(err) {
    console.log(err);
    throw new AppError('Token inválido', 404);
  } 

  const user = await prisma.user.findFirst({ where: { id: userId }, select: { email: true, name: true, role: true, avatar: true } });

  if (!user) throw new AppError('Usuário não encontrado', 404);
    
  req.user = {
    id : userId,
    avatar: user.avatar!,
    email: user.email,
    name: user.name,
    role: user.role
  };

  req.query.userName = user.name;
    
  return next();
}