import prisma from "../../database/db";

interface CreateTurmaData {
  name: string;
  description?: string;
  professorId: string;
}

export default async function createTurmaService(data: CreateTurmaData) {
  const turma = await prisma.turma.create({
    data: {
      name: data.name,
      description: data.description,
      professorId: data.professorId,
    },
    include: {
      professor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
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
  });

  return {
    id: turma.id,
    name: turma.name,
    description: turma.description,
    studentCount: turma.alunos.length,
    students: turma.alunos.map((aluno) => ({
      id: aluno.user.id,
      name: aluno.user.name,
      email: aluno.user.email,
    })),
  };
}
