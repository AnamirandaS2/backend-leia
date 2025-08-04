import prisma from "../../database/db";

export default async function approveUserService(id: string) {
  console.log("=== APPROVE USER SERVICE ===");
  console.log("Aprovando usuário:", id);

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      approved: true,
    },
  });

  console.log("Usuário aprovado com sucesso:", {
    id: user.id,
    name: user.name,
    approved: user.approved,
  });
  console.log("=== FIM APPROVE USER SERVICE ===");

  return user;
}
