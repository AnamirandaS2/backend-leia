import { Request, Response, NextFunction } from 'express';

import { AppError } from '../../error';

export default function checkReviewIsFinished(req: Request, res: Response, next: NextFunction) {
  const { review } = req;
  const { finished } = review;
    
  if (finished) throw new AppError('Review is already finished', 404);
    
  return next();
}