import prisma from '../../database/db';

export default async function getPageService(bookId: string, userId: string) {
  const reading = await prisma.readingTracking.findUnique({
    where: {
      userId_bookId: {
        bookId,
        userId,
      },
    },
    select: {
      page: true
    }
  });

  return reading
}