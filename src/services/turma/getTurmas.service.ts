import prisma from "../../database/db";

export default async function getTurmasService(professorId: string) {
  const turmas = await prisma.turma.findMany({
    where: {
      professorId,
    },
    include: {
      alunos: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return turmas.map((turma) => ({
    id: turma.id,
    name: turma.name,
    description: turma.description,
    studentCount: turma.alunos.length,
    students: turma.alunos.map((aluno) => ({
      id: aluno.user.id,
      name: aluno.user.name,
      email: aluno.user.email,
    })),
  }));
}
