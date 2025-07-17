import prisma from "../../database/db";

export default async function getPostsByBookService(
  bookId: string,
  userId?: string
) {
  const posts = await prisma.post.findMany({
    where: {
      bookId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      book: {
        select: {
          title: true,
          cover: true,
        },
      },
      _count: {
        select: {
          likes: { where: { liked: true } },
        },
      },
      likes: userId
        ? {
            where: {
              userId: userId,
              liked: true,
            },
          }
        : false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts.map((post) => {
    const { _count, likes, ...rest } = post;
    return {
      ...rest,
      likesCount: _count.likes,
      isLiked: likes ? likes.length > 0 : false,
    };
  });
}
