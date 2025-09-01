import prisma from "../../database/db";

export default async function stopReadingService(
  userId: string,
  bookId: string
) {
  const reading = await prisma.readingTracking.findFirst({
    where: {
      userId,
      bookId,
    },
  });

  if (reading) {
    await prisma.readingTracking.update({
      where: { id: reading.id },
      data: {
        finished: true,
        updatedAt: new Date(),
      },
    });
  }
}
