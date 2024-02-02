// author, from, to, genre, minPages = 0, maxPages, enabled = true

import supabase from '../../database/bucket';
import prisma from '../../database/db';
import parseFilename from '../../utils/parseFilename';

interface Params {
    author: string;
    genre: string;
    minPages: string;
    maxPages: string;
}

export default async function fetchBooksService({
  author, genre, minPages, maxPages
}: Params) {
  const books = await prisma.book.findMany({
    where: {
      author: {
        contains: author ?? '',
        mode: 'insensitive',
      },
      genre: {
        contains: genre ?? '',
        mode: 'insensitive',
      },
      pages: {
        gte: Number(minPages ?? 0),
        lte: Number(maxPages ?? 10000),
      },
      enabled: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      author: true,
      genre: true,
      pages: true,
      activities: {
        select: {
          page: true
        }
      }
    }
  });

  const booksAndCovers = await Promise.all(books.map(async (book)=> {
    const { data: { publicUrl }} = await supabase.storage.from('books').getPublicUrl(parseFilename('_cover', book.title, book.author));
    return { ...book, cover: publicUrl };
  }));

  return booksAndCovers;
}