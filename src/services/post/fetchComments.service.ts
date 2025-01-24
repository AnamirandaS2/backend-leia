import prisma from '../../database/db';

export default async function fetchCommentsService(postId: string) {
  return await prisma.postComment.findMany({
    where: {
      postId: postId,
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