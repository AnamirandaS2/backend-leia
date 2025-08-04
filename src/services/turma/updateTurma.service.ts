import prisma from "../../database/db";

interface UpdateTurmaData {
  turmaId: string;
  professorId: string;
  name?: string;
  description?: string;
}

export default async function updateTurmaService({
  turmaId,
  professorId,
  name,
  description,
}: UpdateTurmaData) {
  // Verificar se a turma existe e pertence ao professor
  const existingTurma = await prisma.turma.findFirst({
    where: {
      id: turmaId,
      professorId,
    },
  });

  if (!existingTurma) {
    throw new Error("Turma não encontrada");
  }

  // Preparar dados para atualização
  const updateData: any = {};

  if (name !== undefined) {
    if (!name.trim()) {
      throw new Error("Nome da turma não pode estar vazio");
    }
    updateData.name = name.trim();
  }

  if (description !== undefined) {
    updateData.description = description?.trim() || null;
  }

  // Atualizar a turma
  const updatedTurma = await prisma.turma.update({
    where: {
      id: turmaId,
    },
    data: updateData,
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
  });

  // Formatar a resposta
  return {
    id: updatedTurma.id,
    name: updatedTurma.name,
    description: updatedTurma.description,
    studentCount: updatedTurma.alunos.length,
    students: updatedTurma.alunos.map((turmaAluno) => ({
      id: turmaAluno.user.id,
      name: turmaAluno.user.name,
      email: turmaAluno.user.email,
    })),
  };
}
