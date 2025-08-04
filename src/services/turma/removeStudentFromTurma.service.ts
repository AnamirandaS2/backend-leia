import prisma from "../../database/db";

interface RemoveStudentData {
  turmaId: string;
  studentId: string;
  professorId: string;
}

export default async function removeStudentFromTurmaService({
  turmaId,
  studentId,
  professorId,
}: RemoveStudentData) {
  // Verificar se a turma existe e pertence ao professor
  const turma = await prisma.turma.findFirst({
    where: {
      id: turmaId,
      professorId,
    },
  });

  if (!turma) {
    throw new Error("Turma não encontrada");
  }

  // Verificar se o aluno está na turma
  const turmaAluno = await prisma.turmaAluno.findFirst({
    where: {
      turmaId,
      userId: studentId,
    },
  });

  if (!turmaAluno) {
    throw new Error("Aluno não está nesta turma");
  }

  // Remover o aluno da turma
  await prisma.turmaAluno.delete({
    where: {
      id: turmaAluno.id,
    },
  });

  // Verificar se o aluno ainda está em alguma turma
  const outrasTurmas = await prisma.turmaAluno.findFirst({
    where: {
      userId: studentId,
    },
  });

  // Se não estiver em nenhuma turma, desaprovar o usuário
  if (!outrasTurmas) {
    await prisma.user.update({
      where: {
        id: studentId,
      },
      data: {
        approved: false,
      },
    });
  }

  return { message: "Aluno removido da turma com sucesso" };
}
