import prisma from "../../database/db";

export default async function getPostsByBookService(
  bookId: string,
  requesterId?: string,
  requesterRole?: "USER" | "PROFESSOR" | "ADMIN"
) {
  const whereVisibility: any = {};
  if (requesterRole === "PROFESSOR" || requesterRole === "ADMIN") {
    // Professor/Admin vê tudo, não aplica filtro de visibilidade.
  } else {
    // Usuários normais (ou não logados) veem apenas resenhas públicas.
    whereVisibility.visibility = "PUBLIC";
  }

  const posts = await prisma.post.findMany({
    where: {
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
