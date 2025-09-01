import { NextFunction, Request, Response } from "express";

import { User } from "../../@types/types";
import prisma from "../../database/db";
import { AppError } from "../../error";

export default async function checkReviewExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, reviewId } = req.params;
  const search = id || reviewId;
  const review = await prisma.review.findUnique({ where: { id: search } });
  if (!review) throw new AppError("Review not found", 404);

  req.review = review;

  const user = (await prisma.user.findUnique({
    where: { id: review.userId },
  })) as User;
  req.user = {
    id: user.id!,
    name: user.name!,
    email: user.email!,
    role: user.role!,
  };

  return next();
}
