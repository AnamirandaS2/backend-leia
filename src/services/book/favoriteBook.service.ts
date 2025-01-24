import prisma from '../../database/db';

export default async function favoriteBookService(bookId: string, userId: string) {
  await prisma.favoritedBooks.create({
    data: {
      bookId,
      userId,
    },
    select: {
      bookId: true,
      userId: true,
    },
  });
}