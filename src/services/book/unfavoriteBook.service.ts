import prisma from '../../database/db';

export default async function unfavoriteBookService(bookId: string, userId: string) {
  await prisma.favoritedBooks.delete({
    where: {
      userId_bookId: {
        bookId,
        userId
      }
    }
  });
}