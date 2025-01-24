import { Request, Response } from 'express';

import getPageService from '../services/reading/getPage.service';
import updateTracking from '../services/reading/updateTracking.service';
import startReadingService from '../services/reading/startReading.service';
import stopReadingService from '../services/reading/stopReading.service';
import getReadingsService from '../services/reading/getReadings.service';

export async function updateReading(req: Request, res: Response)
{
  const { id: bookId } = req.book as { id: string };
  const { id: userId } = req.user as { id: string };
  const { page } = req.body;
  const data = await updateTracking(bookId, userId, page);
  return res.status(200).json(data);
}

export async function getPage(req: Request, res: Response) {
  const { id: bookId } = req.book as { id: string };
  const { id: userId } = req.user as { id: string };
  const page = await getPageService(bookId, userId);
  return res.status(200).json(page);
}

export async function startReading(req: Request, res: Response) {
  const { id: bookId } = req.book as { id: string };
  const { id: userId } = req.user as { id: string };
  const { deadline, page } = req.body;
  const data = await startReadingService({ bookId, userId, deadline, page });
  return res.status(200).json(data);
}

export async function deleteReading(req: Request, res: Response) {
  const { id: bookId } = req.book as { id: string };
  const { id: userId } = req.user as { id: string };
  
  await stopReadingService(bookId, userId);

  return res.sendStatus(204);
}

export async function getReadings(req: Request, res: Response) {
  const { id: userId } = req.user as { id: string };
  const readings = await getReadingsService(userId);
  return res.status(200).json(readings);
}