import prisma from '../../database/db';

export default async function likePostService(assignmentId: string, userId: string, liked: boolean) {
  return await prisma.assignmentLikes.upsert({
    where: {
      userId_assignmentId: {
        assignmentId,
        userId,
      }
    },
    update: { liked },
    create: {
      assignmentId,
      userId,
      liked,
    },
    select: {
      liked: true,
      assignmentId: true,
      userId: true,
    }
  });
}