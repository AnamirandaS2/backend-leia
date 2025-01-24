import prisma from '../../database/db';

export default async function getClosestReturnDateService(userId: string) {
  const dates = await prisma.borrowedBook.findMany({
    where: {
      userId,
      returned: false
    },
    select: {
      returnDate: true
    }
  });

  if (!dates.length) {
    return null;
  }

  const closestReturn = dates.reduce((prev, curr) => {
    return prev.returnDate < curr.returnDate ? prev : curr;
  });

  return closestReturn;
}