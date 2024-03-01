import prisma from '../../database/db';

export default async function getReadingsService(userId) {
  const readings = await prisma.reading.findMany({
    where: {
      userId
    },
    include: {
      book: true
    }
  });
  
  return readings;
}