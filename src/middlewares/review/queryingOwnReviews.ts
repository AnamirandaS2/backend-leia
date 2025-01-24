import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../../error';

export default function queryingOwnReviews(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;
  const { userId: userIdToken } = req.query as { userId: string | undefined};

  if (userIdToken) {
    const userId = ((verify(userIdToken, process.env.JWT_SECRET as string)) as { id: string }).id;
    req.query.userId = userId;

    if (id && id !== userId) {
      throw new AppError('You are not allowed to query other users reviews', 403);
    }
  }

  next();
}