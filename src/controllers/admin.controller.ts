import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import prisma from '../database/db';
import approveReviewService from '../services/admin/approveReview.service';
import approveUserService from '../services/admin/approveUserService';
import fetchNonApprovedUsersService from '../services/admin/fetchNonApprovedUsers.service';
import fetchUser from '../services/admin/fetchUser.service';
import fetchUsersService from '../services/admin/fetchUsers.service';
import rejectUserService from '../services/admin/rejectUserService';
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
  const { id } = req.user as { id: string };
  const token = generateToken(id);
  return res.status(200).json({ token });
}

export async function approveReview(req: Request, res: Response)
{
  const { id } = req.params;
  const data = await approveReviewService(id);
  return res.status(200).json(data);
}

export async function fetchNonApprovedUsers(req: Request, res: Response)
{
  const data = await fetchNonApprovedUsersService();
  return res.status(200).json(data);
}

export async function approveUser(req: Request, res: Response)
{
  const { id } = req.params;
  await approveUserService(id);
  return res.status(200);
}

export async function rejectUser(req: Request, res: Response)
{
  const { id } = req.params;
  await rejectUserService(id);
  return res.status(200);
}

export async function fetchUsers(req: Request, res: Response)
{
  const data = await fetchUsersService();
  return res.status(200).json(data);
}

export async function getUser(req: Request, res: Response)
{
  const { reviewId } = req.params;
  const data = await fetchUser(reviewId);
  return res.status(200).json(data);
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
    const user = await prisma.admin.findFirst({ where: { id: userId }});
    return res.status(200).send(!!user);

  } catch(err) {
    return res.status(401).send(false);
  } 
  
}