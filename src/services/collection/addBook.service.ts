import prisma from "../../database/db";

export default async function addBookToCollectionService(
  collectionId: string,
  bookId: string,
  userId: string
) {
  try {
    // Verificar se a coleção pertence ao usuário
    const collection = await prisma.collection.findFirst({
      where: {
        id: collectionId,
        userId: userId,
      },
    });

    if (!collection) {
      throw new Error("Coleção não encontrada ou não pertence ao usuário");
    }

    // Atualizar o livro para associá-lo à coleção
    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        collectionId: collectionId,
      },
    });
  } catch (error) {
    console.error("Erro ao adicionar livro à coleção:", error);
    throw error;
  }
}
