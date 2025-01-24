import prisma from '../../database/db';

export default async function fetchTotalPagesService(bookId) {
  const books = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    select: {
      pages: true,
    }
  });

  return books?.pages;
}