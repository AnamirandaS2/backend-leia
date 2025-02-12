import prisma from '../../database/db';

export default async function updateReadingsService(bookId, userId) {
  prisma.readingTracking.update({
    data: {
      lastRead: new Date()
    },
    where: {
      userId_bookId: {
        bookId,
        userId,
      }
    }
  });
}