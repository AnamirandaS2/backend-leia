import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../error';
import prisma from '../../database/db';

export default async function checkBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title } = req.body;

    const book = await prisma.book.findFirst({ where: { title } });
    if(!book) throw new AppError('Livro não encontrado', 404);

    req.book = book;

    return next();
}