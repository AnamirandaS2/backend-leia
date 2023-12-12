import { Request, Response, NextFunction } from 'express';
import { AppError } from '../error';
import prisma from '../database/db';
import { DataUser } from '../interfaces/user.interface';

export default async function checkEmailAvailability(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    const { email } = req.body as { email: string };
    var conflictMail : DataUser = null;
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
        console.log('Erro Aqui: ', error);
        throw error;
    }
    

    if(conflictMail) {
        const error = new AppError('Este e-mail já está cadastrado.', 409);
        console.log('error is there: ', error);
        throw error;
    }  

    req.user = { email };
    
    return next();
}