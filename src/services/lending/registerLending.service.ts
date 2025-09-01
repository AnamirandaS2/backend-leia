import prisma from "../../database/db";

export default async function registerLendingService(
  bookId: string,
  studentId: string,
  returnDate: string,
  professorId: string
) {
  // Verificar se o livro existe e tem cópias físicas disponíveis
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    select: {
      id: true,
      hasPhysicalCopy: true,
      physicalCopyQuantity: true,
      title: true,
    },
  });

  if (!book) {
    throw new Error("Livro não encontrado");
  }

  if (
    !book.hasPhysicalCopy ||
    !book.physicalCopyQuantity ||
    book.physicalCopyQuantity <= 0
  ) {
    throw new Error("Livro não possui cópias físicas disponíveis");
  }

  // Verificar se o aluno existe e está aprovado
  const student = await prisma.user.findUnique({
    where: { id: studentId },
    select: { id: true, approved: true, role: true },
  });

  if (!student || !student.approved || student.role !== "USER") {
    throw new Error("Aluno não encontrado ou não aprovado");
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

  // Criar o empréstimo
  const lending = await prisma.borrowedBook.create({
    data: {
      userId: studentId,
      bookId: bookId,
      professorId: professorId,
      borrowDate: new Date(),
      returnDate: new Date(returnDate),
      returned: false,
    },
  });

  // Atualizar a quantidade de livros disponíveis
  await prisma.book.update({
    where: { id: bookId },
    data: {
      physicalCopyQuantity: {
        decrement: 1,
      },
    },
  });

  return lending;
}
