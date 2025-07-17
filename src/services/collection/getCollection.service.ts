import prisma from "../../database/db";

export default async function getCollectionService(collectionId: string) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
    include: {
      books: {
        select: {
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              cover: true,
            },
          },
        },
      },
    },
  });

  if (!collection) {
    return null;
  }

  return {
    ...collection,
    books: collection.books.map((b) => b.book),
  };
}
