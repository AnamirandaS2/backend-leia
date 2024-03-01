import prisma from '../../database/db';

export default async function updateReadingsService(bookId, userId) {
  prisma.reading.upsert({
    where: {
      userId_bookId: {
        bookId,
        userId
      }
    },
    create: {
      bookId, 
      userId,
      lastRead: new Date() 
    },
    update: {
      lastRead: new Date()
    }
  });
}