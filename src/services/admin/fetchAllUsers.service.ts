import prisma from '../../database/db';

export default async function fetchAllUsersService() {
  const users = await prisma.user.findMany({
    where: {
      role: 'USER',
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      reviews: {
        select: {
          id: true,
          title: true,
          approved: true,
          finished: true,
        },
      },
      createdAt: true,
    },
  });

  return users;
}