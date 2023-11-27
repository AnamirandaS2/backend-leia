import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../error';
import { compare } from 'bcrypt';
import prisma from '../../database/db';

export default async function checkLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    const userAdmin = await prisma.admin.findFirst({ where: { email } });
    if(!userAdmin) throw new AppError('Email ou senha inválidos', 401);

    const isValidPassword = await compare(password, userAdmin.password);

    if(!isValidPassword) throw new AppError('Email ou senha inválidos', 401);

    req.user = {
        id: userAdmin.id,
        name: userAdmin.name,
        email: userAdmin.email,
    }

    return next();
}