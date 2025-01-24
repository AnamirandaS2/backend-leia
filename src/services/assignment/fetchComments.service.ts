import prisma from '../../database/db';

export default async function fetchCommentsService(assignmentId: string) {
  return await prisma.assignmentComment.findMany({
    where: {
      assignmentId,
      deletedAt: null,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        }
      }
    }
  });

}