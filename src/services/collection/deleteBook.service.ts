import prisma from "../../database/db";

export default async function deleteBookService(
  collectionId: string,
  bookId: string
) {
  await prisma.booksOnCollections.delete({
    where: {
      bookId_collectionId: {
        bookId,
        collectionId,
      },
    },
  });
}
