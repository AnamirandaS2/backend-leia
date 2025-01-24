import prisma from "../../database/db";

export default async function getReadingsService(userId: string) {
  const readings = await prisma.readingTracking.findMany({
    where: {
      userId
    },
    select: {
      bookId: true,
      page: true,
      updatedAt: true,
      deadline: true,
      book: {
        select: {
          title: true,
          author: true,
          cover: true,
        }
      }
    }
  });

  return readings;
}