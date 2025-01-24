import prisma from "../../database/db";

export default async function stopReadingService(bookId: string, userId: string) {
  await prisma.readingTracking.delete({
    where: {
      userId_bookId: {
        bookId,
        userId,
      },
    }
  });
}