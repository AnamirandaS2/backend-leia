import { Request, Response, NextFunction } from "express";
import prisma from "../../database/db";
import { AppError } from "../../error";

export default async function checkReading(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  const reading = await prisma.readingTracking.findUnique({
    where: {
      id,
    },
  });

  if (!reading) {
    throw new AppError("Leitura não encontrada.", 404);
  }

  req.reading = reading;

  next();
}
