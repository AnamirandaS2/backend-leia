import prisma from "../../database/db";

export default async function addBookToCollectionService(collectionId: string, bookId: string) {
  await prisma.collection.update({
    where: {
      id: collectionId
    },
    data: {
      books: {
        connect: {
          id: bookId
        }
      }
    }
  })
}