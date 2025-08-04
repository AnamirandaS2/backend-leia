import prisma from "../../database/db";

interface AddStudentData {
  turmaId: string;
  userId: string;
}

export default async function addStudentToTurmaService(data: AddStudentData) {
  console.log("=== ADD STUDENT TO TURMA SERVICE ===");
  console.log("Dados recebidos:", data);

  // Verificar se o usuário já está na turma
  const existingAluno = await prisma.turmaAluno.findUnique({
    where: {
      turmaId_userId: {
        turmaId: data.turmaId,
        userId: data.userId,
      },
    },
  });

  console.log("Aluno já existe na turma?", !!existingAluno);

  if (existingAluno) {
    throw new Error("Aluno já está nesta turma");
  }

  // Verificar se o usuário existe e está aprovado
  const user = await prisma.user.findUnique({
    where: { id: data.userId },
  });

  console.log(
    "Usuário encontrado:",
    user
      ? { id: user.id, name: user.name, approved: user.approved }
      : "Não encontrado"
  );

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  if (!user.approved) {
    console.log("Usuário não está aprovado!");
    throw new Error("Usuário não está aprovado");
  }

  console.log("Criando relação TurmaAluno...");
  const turmaAluno = await prisma.turmaAluno.create({
    data: {
      turmaId: data.turmaId,
      userId: data.userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  console.log("TurmaAluno criado com sucesso:", turmaAluno);
  console.log("=== FIM ADD STUDENT TO TURMA SERVICE ===");

  return turmaAluno;
}
