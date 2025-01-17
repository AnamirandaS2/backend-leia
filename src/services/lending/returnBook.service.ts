import prisma from '../../database/db';

export default async function returnBookService(lendingId: string) {
  await prisma.borrowedBook.update({
    where: {
      id: lendingId,
    },
    data: {
      returned: true,
    }
  });
}