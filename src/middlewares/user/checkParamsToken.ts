import { NextFunction, Request, Response } from "express";
import { verify, TokenExpiredError } from "jsonwebtoken";

import prisma from "../../database/db";
import { AppError } from "../../error";

export default async function checkParamsToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.params;

  if (!token) throw new AppError("Token não informado", 401);

  try {
    const { id } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as { id: string };
    req.user = { id, name: "", email: "", role: "USER" as const };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new AppError("Token expirado", 401);
    }
    throw new AppError("Token inválido", 401);
  }

  const user = await prisma.user.findFirst({ where: { id: req.user.id } });

  if (!user) throw new AppError("Usuário não encontrado", 404);

  req.user = {
    ...req.user,
    email: user.email,
    name: user.name,
  };

  return next();
}
