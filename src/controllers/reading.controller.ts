import { Request, Response } from "express";

import getPageService from "../services/reading/getPage.service";
import updateTracking from "../services/reading/updateTracking.service";
import stopReadingService from "../services/reading/stopReading.service";
import getReadingsService from "../services/reading/getReadings.service";
import upsertReadingGoalService from "../services/reading/upsertReadingGoal.service";
import getReadingProgressService from "../services/reading/getReadingProgress.service";

export async function updateReading(req: Request, res: Response) {
  const { id: readingTrackingId } = req.reading;
  const { page } = req.body;
  const data = await updateTracking(readingTrackingId, page);
  return res.status(200).json(data);
}

export async function getPage(req: Request, res: Response) {
  const { id: bookId } = req.book as { id: string };
  const { id: userId } = req.user as { id: string };
  const page = await getPageService(bookId, userId);
  return res.status(200).json(page);
}

export async function stopReading(req: Request, res: Response) {
  const { id: bookId } = req.book as { id: string };
  const { id: userId } = req.user;

  await stopReadingService(bookId, userId!);

  return res.sendStatus(204);
}

export async function upsertReadingGoal(req: Request, res: Response) {
  const { bookId } = req.params;
  const { id: userId } = req.user;
  const { deadline, startedAt } = req.body;

  const result = await upsertReadingGoalService({
    bookId,
    userId: userId!,
    deadline,
    startedAt,
  });
  return res.status(200).json(result);
}

export async function getReadingProgress(req: Request, res: Response) {
  const { bookId } = req.params;
  const { id: userId } = req.user;

  const progress = await getReadingProgressService(userId!, bookId);
  return res.status(200).json(progress);
}

export async function getReadings(req: Request, res: Response) {
  const { id: userId } = req.user as { id: string };
  const readings = await getReadingsService(userId);
  return res.status(200).json(readings);
}
