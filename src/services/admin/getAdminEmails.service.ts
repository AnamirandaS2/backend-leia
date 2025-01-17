import prisma from '../../database/db';

export default async function getAdminEmailsService() {
  const emails = (await prisma.user.findMany({ 
    where: {
      role: {
        not: 'USER'
      }
    },
    select: { 
      email: true 
    } 
  })).map(admin => admin.email);

  return emails;
}