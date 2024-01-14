import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../error';

export default async function checkUserNotApprovedMiddleware(req: Request, res: Response, next: NextFunction) {
  const { approved } = req.user;

  if (approved) throw new AppError('Usuário já aprovado', 400);

  return next();
}