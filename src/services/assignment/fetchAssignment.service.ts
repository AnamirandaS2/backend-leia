import prisma from '../../database/db';

export default async function fetchAssignmentService(id: string) {
  const post = await prisma.assignment.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    select: {
      content: true,
      createdAt: true,
      professor: {
        select: {
          id: true,
          name: true,
          avatar: true,
        }
      },
      _count: {
        select: {
          likes: {
            where: {
              liked: true,
            }
          }
        }
      }
    }
  });

  return {
    ...post,
    _count: undefined,
    likes: post!._count.likes,
  };
}