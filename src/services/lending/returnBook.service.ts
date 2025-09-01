import prisma from "../../database/db";

export default async function returnBookService(
  lendingId: string,
  professorId: string
) {
  // Verificar se o empréstimo existe
  const lending = await prisma.borrowedBook.findUnique({
    where: { id: lendingId },
    select: {
      id: true,
      bookId: true,
      returned: true,
    },
  });

  if (!lending) {
    throw new Error("Empréstimo não encontrado");
  }

  if (lending.returned) {
    throw new Error("Livro já foi devolvido");
  }

  // Verificar se o professor existe e tem permissão
  const professor = await prisma.user.findUnique({
    where: { id: professorId },
    select: { id: true, role: true },
  });

  if (
    !professor ||
    (professor.role !== "PROFESSOR" && professor.role !== "ADMIN")
  ) {
    throw new Error("Professor não encontrado ou sem permissão");
  }

  // Marcar como devolvido
  await prisma.borrowedBook.update({
    where: { id: lendingId },
    data: {
      returned: true,
    },
  });

  // Aumentar a quantidade de livros disponíveis
  await prisma.book.update({
    where: { id: lending.bookId },
    data: {
      physicalCopyQuantity: {
        increment: 1,
      },
    },
  });

  return { success: true };
}
