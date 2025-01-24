import prisma from "../../database/db";

export default async function getCollectionService(collectionId: string) {
  return await prisma.collection.findUnique({
    where: {
      id: collectionId
    },
    select: {
      id: true,
      name: true,
      books: {
        select: {
          id: true,
          title: true,
          cover: true,
          author: true,
        }
      }
    }
  })
}