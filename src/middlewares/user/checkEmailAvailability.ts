import { Request, Response, NextFunction } from 'express';

import prisma from '../../database/db';
import { AppError } from '../../error';
import { DataUser } from '../../interfaces/user.interface';

export default async function checkEmailAvailability(req: Request, res: Response, next: NextFunction): Promise<void> {
    
  const { email } = req.body as { email: string };
  let conflictMail : DataUser = null;
  const rota = req.baseUrl;

  if (rota == '/admin')
  {
    conflictMail = await prisma.admin.findFirst({ where: { email }});
  }
  else if(rota == '/user')
  {
    conflictMail = await prisma.user.findFirst({ where: { email }});
  }
  else
  {
    const error = new AppError('Erro Interno no Servidor.', 500);
    throw error;
  }

  if(conflictMail) {
    const error = new AppError('Este e-mail já está cadastrado.', 409);
    throw error;
  }  

  req.user = { email };
    
  return next();
}