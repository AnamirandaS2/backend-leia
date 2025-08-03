import prisma from "../../database/db";

export default async function getUserLendingsService(userId: string) {
  const lendings = await prisma.borrowedBook.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      borrowDate: true,
      returnDate: true,
      returned: true,
      book: {
        select: {
          id: true,
          title: true,
          author: true,
          cover: true,
        },
      },
    },
    orderBy: {
      borrowDate: "desc",
    },
  });

  return lendings;
}
