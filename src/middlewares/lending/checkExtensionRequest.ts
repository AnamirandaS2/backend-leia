import { NextFunction, Request, Response } from 'express';

import prisma from '../../database/db';

export default async function checkExtensionRequest(req: Request, res: Response, next: NextFunction) {
  const { requestId } = req.params;

  if (!requestId) {
    return res.status(400).json({
      message: 'É necessário informar o id do pedido de extensão',
    });
  }

  const request = await prisma.requestExtension.findFirst({
    where: {
      id: requestId,
    },
    select: {
      id: true,
    }
  });

  if (!request) {
    return res.status(404).json({
      message: 'Pedido de extensão não encontrado',
    });
  }

  next();
}