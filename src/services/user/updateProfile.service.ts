import prisma from "../../database/db";
import { User } from "@prisma/client";

interface IUpdateProfileData {
  userId: string;
  name?: string;
  avatar?: string;
}

export default async function updateProfileService({
  userId,
  name,
  avatar,
}: IUpdateProfileData): Promise<Partial<User>> {
  const dataToUpdate: { name?: string; avatar?: string } = {};
  if (name) dataToUpdate.name = name;
  if (avatar) dataToUpdate.avatar = avatar;

  if (Object.keys(dataToUpdate).length === 0) {
    // Se nenhum dado foi enviado, apenas retorna o usuário atual.
    const user = await prisma.user.findUnique({ where: { id: userId } });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user!;
    return userWithoutPassword;
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: dataToUpdate,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
}
