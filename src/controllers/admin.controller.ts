import { Request, Response } from 'express';

import approveReviewService from '../services/admin/approveReview.service';
import approveUserService from '../services/admin/approveUserService';
import fetchAllUsersService from '../services/admin/fetchAllUsers.service';
import fetchApprovedUsersService from '../services/admin/fetchApprovedUsers.service';
import fetchNonApprovedUsersService from '../services/admin/fetchNonApprovedUsers.service';
import fetchUser from '../services/admin/fetchUser.service';
import rejectUserService from '../services/admin/rejectUserService';

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
  return res.sendStatus(200);
}

export async function rejectUser(req: Request, res: Response)
{
  const { id } = req.params;
  await rejectUserService(id);
  return res.sendStatus(200);
}

export async function fetchUsers(req: Request, res: Response)
{
  const data = await fetchApprovedUsersService();
  return res.status(200).json(data);
}

export async function fetchAllUsers(req: Request, res: Response)
{
  const data = await fetchAllUsersService();
  return res.status(200).json(data);
}

export async function getUser(req: Request, res: Response)
{
  const { reviewId } = req.params;
  const data = await fetchUser(reviewId);
  return res.status(200).json(data);
}
