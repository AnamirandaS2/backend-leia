import prisma from "../../database/db";

export default async function fetchUserByIdService(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      approved: true,
      createdAt: true,
      updatedAt: true,
      TurmaAluno: {
        select: {
          turma: {
            select: {
              id: true,
              name: true,
              professor: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return {
    ...user,
    isInAnyTurma: user.TurmaAluno.length > 0,
    turmas: user.TurmaAluno.map((turmaAluno) => ({
      id: turmaAluno.turma.id,
      name: turmaAluno.turma.name,
      professor: turmaAluno.turma.professor,
    })),
  };
}
