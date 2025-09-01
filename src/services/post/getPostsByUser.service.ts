import prisma from "../../database/db";

export default async function getPostsByUserService(
  userId: string,
  bookId?: string,
  requesterId?: string
) {
  // Se não for o próprio autor, só vê públicos
  const whereVisibility =
    requesterId && requesterId !== userId
      ? { visibility: "PUBLIC" as const }
      : {}; // Se for o próprio autor, vê tudo (não filtra por visibilidade)

  const posts = await prisma.post.findMany({
    where: {
      userId,
      bookId,
      ...whereVisibility,
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
          description: true,
        },
      },
      _count: {
        select: {
          likes: { where: { liked: true } },
        },
      },
      likes: requesterId
        ? {
            where: {
              userId: requesterId,
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
    const isLiked = likes && likes.length > 0 ? likes[0].liked : false;
    return {
      ...rest,
      likesCount: _count.likes,
      isLiked,
    };
  });
}
