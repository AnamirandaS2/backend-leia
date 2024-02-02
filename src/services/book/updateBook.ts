import prisma from '../../database/db';

export default async function updateService({ id, author, title, description, genre, pages, cover }) {
  const newInfo = {
  } as { author: string; title: string; description: string; genre: string; pages: number; publishedAt: string; cover: string };
  
  author && (newInfo.author = author);
  title && (newInfo.title = title);
  description && (newInfo.description = description);
  genre && (newInfo.genre = genre);
  pages && (newInfo.pages = pages);
  cover && (newInfo.cover = cover);
      
  const book = await prisma.book.update({
    where: {
      id,
    },
    data: { ...newInfo, updatedAt: new Date() },
    select: {
      author: !!author,
      title: !!title,
      description: !!description,
      genre: !!genre,
      pages: !!pages,
      cover: !!cover,
      updatedAt: true,
    }
  });

  return book;
}