import prisma from '../../database/db';

export default async function rejectRequestService(requestId: string) {
  await prisma.requestLending.delete({
    where: {
      id: requestId,
    },
  });
}