import prisma from '../../database/db';


export default async function updateTracking(bookId: string, userId: string, page: number) {
  const tracking = await prisma.readingTracking.update({
    data: {
      page,
      updatedAt: new Date(),
    },
    where: {
      userId_bookId: {
        bookId,
        userId,
      },
    },
    select: {
      page: true,
      updatedAt: true,
    }
  });

  return tracking;
}