import prisma from '../../database/db';

export default async function deleteService(id: string) {
  await prisma.book.delete({ where: { id }});
}