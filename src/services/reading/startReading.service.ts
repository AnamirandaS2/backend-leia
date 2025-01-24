import prisma from "../../database/db";

interface StartReadingServiceData {
  bookId: string;
  userId: string;
  deadline: Date;
  page?: number;
}

export default async function startReadingService({
  bookId, deadline, page, userId
}: StartReadingServiceData) {
  await prisma.readingTracking.create({
    data: {
      bookId,
      userId,
      deadline,
      page: page || 0
    }
  })
}