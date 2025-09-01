import prisma from "../../database/db";

export default async function updateReadingsService(
  userId: string,
  bookId: string,
  page: number
) {
  const existingReading = await prisma.readingTracking.findFirst({
    where: {
      userId,
      bookId,
    },
  });

  if (existingReading) {
    await prisma.readingTracking.update({
      where: { id: existingReading.id },
      data: {
        page,
        updatedAt: new Date(),
      },
    });
  } else {
    await prisma.readingTracking.create({
      data: {
        userId,
        bookId,
        page,
      },
    });
  }
}
