import * as yup from 'yup';

import prisma from '../../database/db';
import { requestLendingSchema } from '../../schemas/borrow.schema';

type RequestLendingService = yup.InferType<typeof requestLendingSchema> &
 {
  userId: string;
 }

export default async function requestLendingService(data: RequestLendingService) {
  const request = await prisma.requestLending.create({
    data: {
      ...data,
      requestAt: new Date(),
    }
  });

  return {
    id: request.id,
  };
}