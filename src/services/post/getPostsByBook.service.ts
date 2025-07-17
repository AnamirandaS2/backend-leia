import prisma from "../../database/db";

export default async function getPostsByBookService(bookId: string) {
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
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}
