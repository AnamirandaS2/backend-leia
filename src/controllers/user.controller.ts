import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import prisma from '../database/db';
import forgotPasswordService from '../services/user/forgotPassword.service';
import generateToken from '../services/user/generateToken.service';
import registerService from '../services/user/register.service';
import resetPasswordService from '../services/user/resetPassword.service';
import updateService from '../services/user/update.service';

export async function registerController(req: Request, res: Response)
{
  const { name, email, password } = req.body as { name: string; email: string; password: string };
    
  const user = await registerService({ name, email, password }, req);

  return res.status(201).json(user);
}

export function loginController(req : Request, res : Response)
{
  const { id } = req.user as { id: string };
  const token = generateToken(id);
  return res.status(200).json({ token });
}

export async function forgotPasswordController(req: Request, res: Response)
{
  const { id, email } = req.user as { id: string; email: string };

  const token = await generateToken(id);
  await forgotPasswordService(token, email);
  return res.status(200).json({ message: 'Email de recuperação de senha enviado com sucesso!'});
}

export async function resetPasswordController(req: Request, res: Response)
{
  const { newPassword } = req.body;
  const { id } = req.user as { id: string };

  await resetPasswordService(id, newPassword);

  return res.status(200).json({ message: 'Senha alterada com sucesso!' });
}

export async function updateController(req: Request, res: Response)
{
  const { name, password, avatar } = req.body;
  const { id } = req.user;

  const user = await updateService({ id, name, password, avatar });

  return res.status(200).json(user);
}

export async function validateToken(req: Request, res: Response)
{
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send(false);

  const [ , token ] = authorization.split(' ');
  if(!token) return res.status(401).send(false);

  let userId = '';
  req.user = {};
  
  try {
    userId  = (verify(token, process.env.JWT_SECRET as string) as {id: string}).id;
    const user = await prisma.user.findFirst({ where: { id: userId }});
    return res.status(200).send(!!user);

  } catch(err) {
    return res.status(401).send(false);
  } 
  
}