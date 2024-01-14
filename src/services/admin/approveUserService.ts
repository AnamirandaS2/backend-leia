import prisma from '../../database/db';

export default async function approveUserService(id: string) {
  await prisma.user.update({
    where: {
      id
    },
    data: {
      approved: true
    }
  });
}