import prisma from '../../database/db';

export default async function fetchNonApprovedUsersService() {
  const users = await prisma.user.findMany({
    where: {
      approved: false
    },
    select: {
      name: true,
      email: true,
      password: false,
      createdAt: true,
      avatar: true,
      id: true
    }
  });

  return users;
}