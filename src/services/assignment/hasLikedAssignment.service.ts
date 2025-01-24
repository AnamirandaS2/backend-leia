import prisma from '../../database/db';

export default async function hasLikedAssignmentService(assignmentId: string, userId: string) {
  const like = await prisma.assignmentLikes.findFirst({
    where: {
      assignmentId: assignmentId,
      userId: userId,
    },
    select: {
      liked: true,
    }
  });

  return !!like?.liked;
}