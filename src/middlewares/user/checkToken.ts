import { Request, Response, NextFunction } from "express";
import { verify, TokenExpiredError } from "jsonwebtoken";

import prisma from "../../database/db";
import { AppError } from "../../error";

export default async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) throw new AppError("Token não informado", 401);

  const [, token] = authorization.split(" ");
  if (!token) throw new AppError("Token não informado", 401);

  let userId = "";
  // req.user será preenchido após validação do token

  try {
    userId = (verify(token, process.env.JWT_SECRET as string) as { id: string })
      .id;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new AppError("Token expirado", 401);
    }
    throw new AppError("Token inválido", 401);
  }

  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: { email: true, name: true, role: true, avatar: true },
  });

  if (!user) throw new AppError("Usuário não encontrado", 404);

  req.user = {
    id: userId,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return next();
}
