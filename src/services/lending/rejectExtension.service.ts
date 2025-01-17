import prisma from '../../database/db';

export default async function rejectExtensionService(requestId: string) {
  await prisma.requestExtension.delete({
    where: {
      id: requestId
    }
  });
}