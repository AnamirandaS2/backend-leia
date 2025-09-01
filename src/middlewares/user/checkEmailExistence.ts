import { NextFunction, Request, Response } from "express";

import prisma from "../../database/db";
import { AppError } from "../../error";
import { User } from "../../@types/types";

export default async function checkEmailExistence(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body as { email: string };
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new AppError("Email não cadastrado!", 404);

  req.user = {
    id: user.id!,
    name: user.name!,
    email: user.email!,
    role: user.role!,
  };
  return next();
}
