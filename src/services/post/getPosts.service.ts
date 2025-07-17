import prisma from "../../database/db";

export default async function getPostsService() {
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
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20, // Limita a 20 resenhas para não sobrecarregar a home
  });

  return posts;
}
