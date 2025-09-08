import { compare } from "bcrypt";
import { Request, Response, NextFunction } from "express";

import prisma from "../../database/db";
import { AppError } from "../../error";

export default async function checkLogin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      approved: true,
      role: true,
    },
  });
  if (!user) throw new AppError("Email Inválido", 401);

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) throw new AppError("Senha Inválida", 401);
  if (!user.approved) throw new AppError("Usuário não aprovado", 401);

  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    approved: user.approved,
  };

  next();
}
