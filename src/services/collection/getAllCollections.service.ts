import prisma from "../../database/db";

export default async function getAllCollectionsService(userId: string) {
  const collections = await prisma.collection.findMany({
    where: {
      userId
    },
    select: {
      id: true,
      name: true,
      books: {
        take: 1,
        select: {
          cover: true,
        }
      }
    }
  })

  return collections.map( collection => ({
    id: collection.id,
    name: collection.name,
    cover: collection.books[0]?.cover
  }))
}