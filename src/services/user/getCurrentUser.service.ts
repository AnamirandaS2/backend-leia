import prisma from "../../database/db";

export default async function getCurrentUserService(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      approved: true,
    },
  });

  return user;
}
