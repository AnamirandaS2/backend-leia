import prisma from '../../database/db';

interface Data {
  content: string;
  bookId: string;
  rating: number;
  userId: string;
  readingProgress: number;
}

export default async function createPostService(data: Data) {
  await prisma.post.create({ data, select: { id: true } });
}