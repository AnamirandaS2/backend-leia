import prisma from "../../database/db";

export default async function deleteCollectionService(collectionId: string) {
  await prisma.collection.delete({
    where: {
      id: collectionId
    }
  })
}