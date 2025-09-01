import { Request, Response, NextFunction } from "express";

import prisma from "../../database/db";
import { AppError } from "../../error";

export default async function checkEmailAvailability(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email } = req.body as { email: string };

  const conflictMail = await prisma.user.findFirst({ where: { email } });

  if (conflictMail) {
    const error = new AppError("Este e-mail já está cadastrado.", 409);
    throw error;
  }

  req.user = { id: "", name: "", email, role: "USER" as const };

  return next();
}
