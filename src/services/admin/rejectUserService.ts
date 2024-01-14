import prisma from '../../database/db';

export default async function rejectUserService(id: string) {
  await prisma.user.delete({ 
    where: { 
      id 
    }
  });
}