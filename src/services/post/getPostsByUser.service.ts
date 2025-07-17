import prisma from "../../database/db";

export default async function getPostsByUserService(
  userId: string,
  bookId?: string
) {
  const posts = await prisma.post.findMany({
    where: {
      userId,
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
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}
