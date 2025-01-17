import prisma from '../../database/db';

export default async function approveLendingExtensionService(requestId: string) {
  const request = await prisma.requestExtension.findUnique({
    where: {
      id: requestId,
    },
    select: {
      lendingId: true,
      extraTime: true,
    }
  });

  const borrowed = await prisma.borrowedBook.findUnique({
    where: {
      id: request!.lendingId,
    },
    select: {
      returnDate: true,
    }
  });
  
  const newReturnDate = new Date(borrowed!.returnDate);
  newReturnDate.setDate(newReturnDate.getDate() + request!.extraTime);

  await prisma.borrowedBook.update({
    where: {
      id: request!.lendingId,
    },
    data: {
      returnDate: newReturnDate,
    }
  });

  await prisma.requestExtension.update({
    data: {
      approved: true,
    },
    where: {
      id: requestId,
    }
  });
}