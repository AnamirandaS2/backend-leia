import prisma from '../../database/db';

export default async function fetchFavoritesService(userId: string) {
  const books = await prisma.favoritedBooks.findMany({
    where: {
      userId
    },
    select: {
      book: {
        select: {
          id: true,
          title: true,
          author: true,
          cover: true,
        }
      }
    }
  });

  return books.map(({ book }) => book);
}