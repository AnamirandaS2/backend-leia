import prisma from "../../database/db";

interface AddPhysicalBookData {
  title: string;
  author: string;
  cover: string;
}

export default async function addPhysicalBookService(
  data: AddPhysicalBookData
) {
  const book = await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      cover: data.cover,
      description: "Livro físico disponível para empréstimo",
      genre: "Físico",
      pages: 0,
      enabled: true,
      hasPhysicalCopy: true,
      physicalCopyQuantity: 1,
      source: "Físico",
      fileUrl: "",
    },
  });

  return book;
}
