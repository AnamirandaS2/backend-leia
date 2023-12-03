import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../error';
import prisma from '../../database/db';

export default async function checkEmailAvailability(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body as { email: string };

    const conflictMail = await prisma.user.findFirst({ where: { email }});

    if(conflictMail) {
        const error = new AppError('Este e-mail já está cadastrado.', 409);
        console.log('error is there: ', error);
        throw error;
    }  

    req.user = { email };
    
    return next();
}