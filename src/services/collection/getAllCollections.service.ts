import prisma from "../../database/db";

export default async function getAllCollectionsService(userId: string) {
  const collections = await prisma.collection.findMany({
    where: {
      userId,
    },
    include: {
      books: {
        // This is the relation to the join table BooksOnCollections
        include: {
          book: {
            // This is the relation from the join table to the Book model
            select: {
              id: true,
              cover: true,
            },
          },
        },
        take: 4,
      },
    },
  });

  // Transform the data to match the frontend's expected structure
  return collections.map((collection) => ({
    id: collection.id,
    name: collection.name,
    userId: collection.userId,
    createdAt: collection.createdAt,
    updatedAt: collection.updatedAt,
    books: collection.books.map((item) => item.book),
  }));
}
