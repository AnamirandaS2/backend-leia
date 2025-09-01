import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import * as yup from "yup";

import prisma from "../database/db";
import { registerSchema } from "../schemas/admin.schema";
import forgotPasswordService from "../services/user/forgotPassword.service";
import generateToken from "../services/user/generateToken.service";
import getCurrentUserService from "../services/user/getCurrentUser.service";
import registerService from "../services/user/register.service";
import resetPasswordService from "../services/user/resetPassword.service";
import storeAvatar from "../services/user/storeAvatar.service";
import updateService from "../services/user/update.service";
import { v4 } from "uuid";
import deleteAvatar from "../services/user/deleteAvatar.service";
import getApprovedStudentsService from "../services/user/getApprovedStudents.service";
import updateProfileService from "../services/user/updateProfile.service";

export async function registerController(req: Request, res: Response) {
  const { name, email, password, role } = req.body as yup.InferType<
    typeof registerSchema
  >;

  const id = v4();
  let avatar;

  if (req.files && (req.files as any).avatar) {
    avatar = await storeAvatar(
      id,
      (req.files as any).avatar as Express.Multer.File
    );
  }

  const user = await registerService({
    id,
    name,
    email,
    password,
    avatar,
    role,
  });

  return res.status(201).json(user);
}

export function loginController(req: Request, res: Response) {
  const { id } = req.user as { id: string };
  const token = generateToken(id);
  return res.status(200).json({ token });
}

export async function forgotPasswordController(req: Request, res: Response) {
  const { id, email } = req.user as { id: string; email: string };

  const token = await generateToken(id);
  await forgotPasswordService(token, email);
  return res
    .status(200)
    .json({ message: "Email de recuperação de senha enviado com sucesso!" });
}

export async function resetPasswordController(req: Request, res: Response) {
  const { newPassword } = req.body;
  const { id } = req.user as { id: string };

  await resetPasswordService(id, newPassword);

  return res.status(200).json({ message: "Senha alterada com sucesso!" });
}

export async function updateController(req: Request, res: Response) {
  const { name, password } = req.body;
  const avatar = (req.files as any)?.avatar;
  const { id } = req.user as { id: string; avatar?: string };
  const hasAvatar = (req.user as any)?.avatar;

  let avatarUrl = hasAvatar;

  if (avatar) {
    if (hasAvatar) {
      await deleteAvatar(id!);
    }

    avatarUrl = await storeAvatar(id!, avatar);
  }

  const user = await updateService({
    id: id!,
    name,
    password,
    avatar: avatarUrl,
  });

  return res.status(200).json(user);
}

export async function updateProfileController(req: Request, res: Response) {
  const { id: userId } = req.user as { id: string };
  const { name, avatar } = req.body;

  try {
    const updatedUser = await updateProfileService({ userId, name, avatar });
    return res.status(200).json(updatedUser);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function validateToken(req: Request, res: Response) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send(false);

  const [, token] = authorization.split(" ");
  if (!token) return res.status(401).send(false);

  let userId = "";

  try {
    userId = (verify(token, process.env.JWT_SECRET as string) as { id: string })
      .id;
    const user = await prisma.user.findFirst({ where: { id: userId } });
    return res.status(200).send(!!user);
  } catch (err) {
    return res.status(401).send(false);
  }
}

export async function getCurrentUserController(req: Request, res: Response) {
  const { id: userId } = req.user as { id: string };

  try {
    const user = await getCurrentUserService(userId);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export function refreshTokenController(req: Request, res: Response) {
  const { id } = req.user as { id: string };
  const token = generateToken(id);
  return res.status(200).json({ token });
}

export async function getApprovedStudentsController(
  req: Request,
  res: Response
) {
  try {
    const students = await getApprovedStudentsService();
    return res.status(200).json(students);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
