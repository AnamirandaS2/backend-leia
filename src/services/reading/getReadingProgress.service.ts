import prisma from "../../database/db";

export default async function getReadingProgressService(
  userId: string,
  bookId: string
) {
  const readingProgress = await prisma.readingTracking.findFirst({
    where: {
      userId,
      bookId,
      finished: false,
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  return readingProgress;
}
