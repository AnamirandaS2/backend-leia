import { Request, Response } from 'express';

import forgotPasswordService from '../services/user/forgotPassword.service';
import generateToken from '../services/user/generateToken.service';
import registerService from '../services/user/register';
import resetPasswordService from '../services/user/resetPassword.service';

export async function registerController(req: Request, res: Response)
{
  const { name, email, password } = req.body as { name: string; email: string; password: string };
    
  const user = await registerService({ name, email, password });

  return res.status(201).json(user);
}

export function loginController(req : Request, res : Response)
{
  const { id } = req.user;
  const token = generateToken(id);
  return res.status(200).json({ token });
}

export async function forgot()
{

}

export async function updateUser(req: Request, res: Response)
{
  console.log('ok!');
  return res.status(200).json({'message' : 'user atualizado!'});
}

export async function forgotPasswordController(req: Request, res: Response)
{
  const { id, email } = req.user;

  const token = await generateToken(id);
  await forgotPasswordService(token, email);
  return res.status(200).json({ message: 'Email de recuperação de senha enviado com sucesso!'});
}

export async function resetPasswordController(req: Request, res: Response)
{
  const { newPassword } = req.body;
  const { id } = req.user;

  await resetPasswordService(id, newPassword);

  return res.status(200).json({ message: 'Senha alterada com sucesso!' });
}