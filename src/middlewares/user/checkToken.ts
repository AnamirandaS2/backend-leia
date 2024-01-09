import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkToken(req: Request, res: Response, next: NextFunction) {
  
  const { authorization } = req.headers;
  if (!authorization) throw new AppError('Token não informado', 401);
    
  const [ , token ] = authorization.split(' ');
  if(!token) throw new AppError('Token não informado', 401);

  let id = '';
  req.user = {};
  
  try {
    id  = (verify(token, process.env.JWT_SECRET as string) as {id: string});
  } catch(err) {
    throw new AppError('Token inválido', 404);
  } 

  const DataUser  =  
    await prisma.user.findFirst({ where: { id }, select: { email: true, name: true }}) || await prisma.admin.findFirst({ where: { id }, select: { email: true, name: true, authorityLevel: true }});
  
  req.user = {
    id : id,
    ...DataUser,
  };
  
  return next();
}