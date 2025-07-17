import prisma from "../../database/db";

interface UpsertReadingGoalData {
  userId: string;
  bookId: string;
  startedAt?: Date;
  deadline?: Date;
}

export default async function upsertReadingGoalService({
  userId,
  bookId,
  startedAt,
  deadline,
}: UpsertReadingGoalData) {
  const existingReading = await prisma.readingTracking.findFirst({
    where: {
      userId,
      bookId,
      finished: false,
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  if (existingReading) {
    return prisma.readingTracking.update({
      where: {
        id: existingReading.id,
      },
      data: {
        startedAt,
        deadline,
      },
    });
  }

  return prisma.readingTracking.create({
    data: {
      userId,
      bookId,
      startedAt,
      deadline,
    },
  });
}
