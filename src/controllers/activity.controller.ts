import { Request, Response } from 'express';

import getPageService from '../services/activity/getPage.service';
import upsertPageService from '../services/activity/upsertPage.service';

export async function upsertPage(req: Request, res: Response)
{
  const { id: bookId } = req.book as { id: string };
  const { id: userId } = req.user as { id: string };
  const { page } = req.body;
  const data = await upsertPageService(bookId, userId, page);
  return res.status(200).json(data);
}

export async function getPage(req: Request, res: Response) {
  const { id: bookId } = req.book as { id: string };
  const { id: userId } = req.user as { id: string };
  const page = await getPageService(bookId, userId);
  return res.status(200).json(page);
}