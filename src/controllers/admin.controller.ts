import { Request, Response } from 'express';

import approveReviewService from '../services/admin/approveReview.service';
import generateToken from '../services/user/generateToken.service';
import registerService from '../services/user/register.service';

export async function registerController(req: Request, res: Response)
{
  const { name, email, password } = req.body as { name: string; email: string; password: string };
    
  const userAdmin = await registerService({ name, email, password }, req);

  return res.status(201).json(userAdmin);
}

export function loginController(req : Request, res : Response)
{
  const { id } = req.admin;
  const token = generateToken(id);
  return res.status(200).json({ token });
}

export async function approveReview(req: Request, res: Response)
{
  const { id } = req.params;
  const data = await approveReviewService(id);
  return res.status(200).json(data);
}