import prisma from "../../database/db";
import { AppError } from "../../error";

interface CreatePostData {
  userId: string;
  bookId: string;
  content: string;
  rating: number;
}

export default async function createPostService({
  userId,
  bookId,
  content,
  rating,
}: CreatePostData) {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    throw new AppError("Livro não encontrado.", 404);
  }

  const readingProgress = await prisma.readingTracking.findFirst({
    where: { userId, bookId, finished: false },
    orderBy: { startedAt: "desc" },
  });

  const post = await prisma.post.create({
    data: {
      userId,
      bookId,
      content,
      rating,
      readingProgress: readingProgress
        ? Math.round((readingProgress.page / book.pages) * 100)
        : 0,
    },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  });

  return post;
}
