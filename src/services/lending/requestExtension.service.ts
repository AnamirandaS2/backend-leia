import * as yup from 'yup';

import prisma from '../../database/db';
import { lendingExtensionSchema } from '../../schemas/borrow.schema';

export default async function requestExtensionService({ extraTime, lendingId }: yup.InferType<typeof lendingExtensionSchema>) {
  const request = await prisma.requestExtension.create({
    data: {
      extraTime,
      lendingId,
    }
  });

  return {
    id: request.id,
  };
}