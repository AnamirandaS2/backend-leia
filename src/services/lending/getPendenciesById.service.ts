import { Pendency } from '../../@types/types';
import prisma from '../../database/db';

export default async function getPendenciesByIdService(userId: string): Promise<Pendency[]> {
  const pendencies = await prisma.borrowedBook.findMany({
    where: {
      userId,
      returned: false,
    },
    select: {
      book: {
        select: {
          title: true,
          author: true,
          id: true,
        }
      },
      borrowDate: true,
      returnDate: true,

    }
  });

  return pendencies.map((pendency) => ({
    book: {
      title: pendency.book.title,
      author: pendency.book.author,
      id: pendency.book.id,
    },
    borrowDate: pendency.borrowDate,
    returnDate: pendency.returnDate,
  }));
}