import prisma from '../../database/db';

export default async function getAdminEmailsService() {
  const emails = (await prisma.admin.findMany({ select: { email: true } })).map(admin => admin.email);
  return emails;
}