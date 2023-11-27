import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../error';
import { verify } from 'jsonwebtoken'
import prisma from '../../database/db';

export default async function checkToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authorization = req.headers["authorization"] as string;
    const token = authorization?.split(" ")[1];

    if(!token) throw new AppError("Token não informado", 401);
    
    try {
        const { id } = verify(token, process.env.JWT_SECRET) as {id: string};
        const userAdmin = await prisma.admin.findFirst({ where: { id } });

        req.user = {
            id: id,
            email: userAdmin.email,
            name: userAdmin.name
        }
    
        return next();

    } catch(err) {
        throw new AppError("Token inválido", 404);
    }

}