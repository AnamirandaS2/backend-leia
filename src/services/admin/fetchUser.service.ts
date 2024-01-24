import prisma from '../../database/db';

export default async function fetchUser(reviewId: string) {
  const user = await prisma.user.findFirst({ 
    where: { 
      reviews: {
        some: {
          id: reviewId
        }
      } 
    }, 
    select: { 
      id: true, 
      name: true, 
      email: true,
      avatar: true,
      createdAt: true,
      reviews: {
        where: {
          id: reviewId
        },
        select: {
          id: true,
          finished: true,
          approved: true,
          title: true,
          book: {
            select: {
              id: true,
              title: true,
              author: true,

            }
          } 
        } 
      }
    }
  }
  );

  return user;
}
