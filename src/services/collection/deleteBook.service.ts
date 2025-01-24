import prisma from "../../database/db";

export default async function deleteBookService(collectionId: string, bookId: string) {
  await prisma.collection.update({
    where: {
      id: collectionId
    },
    data: {
      books: {
        disconnect: {
          id: bookId
        }
      }
    }
  })
}