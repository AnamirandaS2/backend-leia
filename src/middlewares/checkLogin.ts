import { compare } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import prisma from '../database/db';
import { AppError } from '../error';


export default async function checkLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  
  const { email, password } = req.body;
  const rota = req.baseUrl;

  if (rota == '/user') {

    const user = await prisma.user.findFirst({ where: { email } });
    if(!user) throw new AppError('Email Inválido', 401);

    const isValidPassword = await compare(password, user.password);
    if(!isValidPassword) throw new AppError('Senha Inválida', 401);

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    return next();

  } 
  else if (rota == '/admin') {
  
    const admin = await prisma.admin.findFirst({ where: { email } });
    if(!admin) throw new AppError('Email Inválido', 401);

    const isValidPassword = await compare(password, admin.password);
    if(!isValidPassword) throw new AppError('Senha Inválida', 401);

    req.admin = {
      id: admin.id,
      name: admin.name,
      email: admin.email
    };

    return next();

  } 
  else {

    const error = new AppError('Erro Interno no Servidor.', 500);
    console.log('Erro Aqui: ', error);
    throw error;
  }

}