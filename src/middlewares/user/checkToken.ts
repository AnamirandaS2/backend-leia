import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../error';
import { verify } from 'jsonwebtoken';
import prisma from '../../database/db';

export default async function checkToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) throw new AppError('Token não informado', 401);
    
    const [ , token ] = authorization.split(' ');

    if(!token) throw new AppError('Token não informado', 401);
    
    try {
        const { id } = verify(token, process.env.JWT_SECRET) as {id: string};
        const user = await prisma.user.findFirst({ where: { id } });

        req.user = {
            id: id,
            email: user.email,
            name: user.name
        };
    
        return next();

    } catch(err) {
        throw new AppError('Token inválido', 404);
    }

}