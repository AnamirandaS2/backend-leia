import prisma from "../../database/db";

export default async function fetchPhysicalBooksService() {
  const books = await prisma.book.findMany({
    where: {
      hasPhysicalCopy: true,
    },
    select: {
      id: true,
      title: true,
      author: true,
      cover: true,
      physicalCopyQuantity: true,
    },
  });

  return books;
}
