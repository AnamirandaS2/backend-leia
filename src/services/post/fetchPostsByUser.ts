import prisma from "../../database/db";

export default async function fetchPostsByUser(userId: string) {
  return await prisma.post.findMany({
    where: {
      userId,
      deletedAt: null,
    },
    select: {
      id: true,
      content: true,
      rating: true,
      createdAt: true,
      likes: true,
      readingProgress: true,
      book: {
        select: {
          title: true,
          author: true,
          cover: true,
          description: true,
          genre: true,
        },
      },
    },
  });
}
