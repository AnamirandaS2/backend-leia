import prisma from "../../database/db";

export default async function createCollectionService(userId: string, collectionName: string) {
  return await prisma.collection.create({
    data: {
      name: collectionName,
      userId
    },
    select: {
      id: true,
      name: true
    }
  })
}