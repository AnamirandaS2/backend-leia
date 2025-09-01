import prisma from "../../database/db";

export default async function getProfessorLendingsService(professorId: string) {
  const lendings = await prisma.borrowedBook.findMany({
    where: {
      professorId: professorId,
    },
    include: {
      book: {
        select: {
          id: true,
          title: true,
          author: true,
          cover: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      borrowDate: "desc",
    },
  });

  return lendings;
}
