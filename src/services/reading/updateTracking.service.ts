import prisma from "../../database/db";
import { AppError } from "../../error";

export default async function updateTracking(
  readingTrackingId: string,
  page: number
) {
  const reading = await prisma.readingTracking.findUnique({
    where: { id: readingTrackingId },
  });

  if (!reading) {
    throw new AppError("Leitura não encontrada.", 404);
  }

  const updatedReading = await prisma.readingTracking.update({
    where: {
      id: readingTrackingId,
    },
    data: {
      page,
    },
  });

  return updatedReading;
}
