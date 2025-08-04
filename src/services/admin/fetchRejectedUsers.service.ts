import prisma from "../../database/db";

export default async function fetchRejectedUsersService() {
  const users = await prisma.user.findMany({
    where: {
      approved: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
      // Verificar se o usuário está em alguma turma
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
    orderBy: {
      updatedAt: "desc",
    },
  });

  // Formatar a resposta para incluir informações sobre turmas
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isInAnyTurma: user.TurmaAluno.length > 0,
    turmas: user.TurmaAluno.map((turmaAluno) => ({
      id: turmaAluno.turma.id,
      name: turmaAluno.turma.name,
      professor: turmaAluno.turma.professor,
    })),
    status:
      user.TurmaAluno.length > 0
        ? "Em turma mas não aprovado"
        : "Recusado/Removido",
  }));
}
