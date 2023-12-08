import prisma from '../../database/db';

export default async function approveReviewService(reviewId: string) {
  const review = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      approved: true,
      updatedAt: new Date(),
    },
    select: {
      approved: true,
      title: true,
      finished: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
          email: true,
        }
      },
      book: {
        select: {
          title: true,
          author: true,
        }
      }
    }
  });

  return review;
}