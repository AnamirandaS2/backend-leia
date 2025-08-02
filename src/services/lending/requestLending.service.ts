import prisma from "../../database/db";

interface RequestLendingData {
  userId: string;
  bookId: string;
  lendingDuration: number; // in days
}

export default async function requestLendingService({
  userId,
  bookId,
  lendingDuration,
}: RequestLendingData) {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    select: { physicalCopyQuantity: true },
  });

  if (!book || !book.physicalCopyQuantity || book.physicalCopyQuantity <= 0) {
    throw new Error("Livro não disponível para empréstimo.");
  }

  const existingRequest = await prisma.requestLending.findFirst({
    where: {
      userId,
      bookId,
      approved: false, // Check for pending requests
    },
  });

  if (existingRequest) {
    throw new Error("Você já possui uma solicitação pendente para este livro.");
  }

  const request = await prisma.requestLending.create({
    data: {
      userId,
      bookId,
      lendingDuration,
      requestAt: new Date(),
    },
  });

  return request;
}
