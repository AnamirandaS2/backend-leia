import { NextFunction, Request, Response } from "express";

import prisma from "../../database/db";

export default async function checkPostIsFromUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const post = await prisma.post.findFirst({
    where: {
      id: req.params.id,
      OR: [
        { userId: req.user.id },
        {
          user: {
            role: {
              in: ["ADMIN", "PROFESSOR"],
            },
          },
        },
      ],
    },
    select: {
      userId: true,
    },
  });

  if (!post)
    return res.status(403).json({ message: "Post não pertence ao usuario" });

  next();
}
