import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../error';

export default async function checkAdvancedAdminPermission(req: Request, res: Response, next: NextFunction) {
  const { authorityLevel } = req.admin as { authorityLevel: number };
  if (authorityLevel < 2) throw new AppError('Você não tem permissão para acessar essa rota', 403);

  return next();
}