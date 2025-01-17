import prisma from '../../database/db';

export default async function lendBookService(requestId: string) {
  const request = await prisma.requestLending.findUnique({
    where: {
      id: requestId,
    },
    select: {
      bookId: true,
      userId: true,
      lendingDuration: true,
    }
  });

  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + request!.lendingDuration);
  
  // supabase error if try to create and delete at the same time with promise.All
  // didn't investigate any further
  const borrowed = await prisma.borrowedBook.create({
    data: {
      borrowDate: new Date(),
      returnDate,
      bookId: request!.bookId,
      userId: request!.userId,
    }
  });

  await prisma.requestLending.delete({
    where: {
      id: requestId,
    }
  });

  return {
    id: borrowed.id,
  };
}