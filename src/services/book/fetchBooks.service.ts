// author, from, to, genre, minPages = 0, maxPages, enabled = true

import supabase from "../../database/bucket";
import prisma from "../../database/db";
import parseFilename from "../../utils/parseFilename";

interface Params {
  author: string;
  genre: string;
  minPages: string;
  maxPages: string;
  title: string;
}

export default async function fetchBooksService({
  author,
  genre,
  minPages,
  maxPages,
  title,
}: Params) {
  return await prisma.book.findMany({
    where: {
      title: {
        contains: title ?? "",
        mode: "insensitive",
      },
      author: {
        contains: author ?? "",
        mode: "insensitive",
      },
      genre: {
        contains: genre ?? "",
        mode: "insensitive",
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
      cover: true,
    },
  });
}
