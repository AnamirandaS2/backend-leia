import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import prisma from '../../database/db';
import { AppError } from '../../error';

export default async function checkToken(req: Request, res: Response, next: NextFunction) {
  
  const { authorization } = req.headers;
  if (!authorization) throw new AppError('Token não informado', 401);
  console.log('authorization');
    
  const [ token ] = authorization.split(' ');
  if(!token) throw new AppError('Token não informado', 401);

  let id;
  req.user = {};
  
  try {
    id  = (verify(token, process.env.JWT_SECRET as string) as {id: string});
    console.log('id ok');
  } catch(err) {
    throw new AppError('Token inválido', 404);
  } 

  console.log(id.id);
  const DataUser  =  
    await prisma.user.findFirst({ where: { id : id.id }, select: { email: true, name: true }}) || await prisma.admin.findFirst({ where: { id: id.id }, select: { email: true, name: true, authorityLevel: true }});

  console.log(`usr ${ DataUser?.email}`);
  req.user = {
    id : id.id,
    ...DataUser,
  };
  
  return next();
}