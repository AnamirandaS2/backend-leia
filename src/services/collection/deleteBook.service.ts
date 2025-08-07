import prisma from "../../database/db";

export default async function deleteBookService(
  collectionId: string,
  bookId: string
) {
  // Remover a associação do livro com a coleção
  await prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      collectionId: null,
    },
  });
}
