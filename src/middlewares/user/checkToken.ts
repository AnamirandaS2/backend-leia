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

  const isUser = await prisma.user.findFirst({ where: { id: userId }, select: { email: true, name: true }});
  const isAdmin  = await prisma.admin.findFirst({ where: { id: userId }, select: { email: true, name: true, authorityLevel: true }});

  if (!isUser && !isAdmin) throw new AppError('Usuário não encontrado', 404);
    
  if (isUser) {
    req.user = {
      id : userId,
      ...isUser,
    };

    req.query.userName = isUser.name;
  }

  if (isAdmin) {
    req.admin = {
      id : userId,
      ...isAdmin,
    };
  }
    
  return next();
}