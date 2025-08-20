import prisma from "../../database/db";

export default async function getApprovedStudentsService() {
  const students = await prisma.user.findMany({
    where: {
      approved: true,
      role: "USER", // Apenas usuários normais (alunos)
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return students;
}
