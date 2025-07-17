import prisma from "../../database/db";

export default async function getAllCollectionsService(userId: string) {
  const collections = await prisma.collection.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      books: {
        select: {
          book: {
            select: {
              id: true,
              cover: true,
              title: true,
              author: true,
            },
          },
        },
      },
    },
  });

  // Transform the data to match the frontend's expected structure
  return collections.map((collection) => ({
    id: collection.id,
    name: collection.name,
    books: collection.books.map((item) => item.book),
  }));
}
