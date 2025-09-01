import prisma from "../../database/db";

export default async function getPageService(userId: string, bookId: string) {
  const reading = await prisma.readingTracking.findFirst({
    where: {
      userId,
      bookId,
    },
  });

  return reading?.page || 0;
}
