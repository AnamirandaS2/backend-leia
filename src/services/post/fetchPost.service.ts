import prisma from '../../database/db';

export default async function fetchPostService(id: string) {
  const post = await prisma.post.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    select: {
      content: true,
      rating: true,
      readingProgress: true,
      createdAt: true,
      book: {
        select: {
          id: true,
          title: true,
          description: true,
          author: true,
        }
      },
      user: {
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