import { Request, Response, NextFunction } from 'express';

import prisma from '../../database/db';

export async function checkRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { requestId } = req.params;

  if (!requestId) {
    res.status(400).json({ message: 'Request ID is required' });
    return;
  }

  const request = await prisma.requestLending.findUnique({
    where: {
      id: requestId,
    },
  });

  if (!request) {
    res.status(404).json({ message: 'Request not found' });
    return;
  }

  next();
}