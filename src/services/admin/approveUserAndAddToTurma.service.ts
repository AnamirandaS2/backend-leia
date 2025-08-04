import prisma from "../../database/db";

interface ApproveUserAndAddToTurmaData {
  userId: string;
  turmaId: string;
}

export default async function approveUserAndAddToTurmaService(
  data: ApproveUserAndAddToTurmaData
) {
  console.log("=== APPROVE USER AND ADD TO TURMA SERVICE ===");
  console.log("Dados recebidos:", data);

  return await prisma.$transaction(async (tx) => {
    // 1. Aprovar o usuário
    console.log("1. Aprovando usuário...");
    const user = await tx.user.update({
      where: { id: data.userId },
      data: { approved: true },
    });

    console.log("Usuário aprovado:", {
      id: user.id,
      name: user.name,
      approved: user.approved,
    });

    // 2. Verificar se o usuário já está na turma
    console.log("2. Verificando se usuário já está na turma...");
    const existingAluno = await tx.turmaAluno.findUnique({
      where: {
        turmaId_userId: {
          turmaId: data.turmaId,
          userId: data.userId,
        },
      },
    });

    if (existingAluno) {
      console.log("Usuário já está na turma!");
      throw new Error("Aluno já está nesta turma");
    }

    // 3. Adicionar usuário à turma
    console.log("3. Adicionando usuário à turma...");
    const turmaAluno = await tx.turmaAluno.create({
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

    console.log("Usuário adicionado à turma com sucesso:", turmaAluno);
    console.log("=== FIM APPROVE USER AND ADD TO TURMA SERVICE ===");

    return {
      user,
      turmaAluno,
    };
  });
}
