import prisma from "../../database/db";

export default async function getPostsService(userId?: string) {
  const posts = await prisma.post.findMany({
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
            },
          }
        : false,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });

  return posts.map((post) => {
    const { _count, likes, ...rest } = post;
    const isLiked = likes && likes.length > 0 ? likes[0].liked : false;
    return {
      ...rest,
      likesCount: _count.likes,
      isLiked,
    };
  });
}
