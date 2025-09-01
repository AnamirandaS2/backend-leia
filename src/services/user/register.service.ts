import { User } from "@prisma/client";
import hash from "bcrypt";

import prisma from "../../database/db";
import { generateRandomAvatarUrl } from "../../utils/generateAvatar";

type RegisterData = {
  id: User["id"];
  email: User["email"];
  name: User["name"];
  password: User["password"];
  avatar: User["avatar"];
  role?: User["role"];
};

export default async function registerService({
  id,
  email,
  name,
  password,
  avatar,
  role,
}: RegisterData) {
  const finalAvatar = avatar || generateRandomAvatarUrl();

  const user = await prisma.user.create({
    data: {
      id,
      email,
      password: hash.hashSync(password, 12),
      name,
      avatar: finalAvatar,
      role,
      approved: role && role !== "USER",
    },
  });

  return { ...user, id: undefined, password: undefined, updatedAt: undefined };
}
