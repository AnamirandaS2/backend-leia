import { Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export default function checkPermission(permission: Role[]) {
  return function(req: Request, res: Response, next: NextFunction) {
    const { role } = req.user;
  
    if (!permission.includes(role!)) {
      return res.status(403).json({ message: 'Você não tem permissão para acessar esse recurso' });
    }

    return next();
  };
}