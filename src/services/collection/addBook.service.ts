import prisma from "../../database/db";

export default async function addBookToCollectionService(
  collectionId: string,
  bookId: string,
  userId: string
) {
  await prisma.booksOnCollections.create({
    data: {
      collectionId,
      bookId,
      assignedBy: userId,
    },
  });
}
