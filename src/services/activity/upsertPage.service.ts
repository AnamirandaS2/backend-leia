import prisma from '../../database/db';

export default async function upsertPageService(bookId: string, userId: string, page: number) {
  const activity = await prisma.activity.upsert({
    create: {
      bookId,
      userId,
      page,
    },
    update: {
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

  return activity;
}