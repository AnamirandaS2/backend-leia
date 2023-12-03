import prisma from '../../database/db';

export default async function findReviewByIdService(reviewId: string) {
    const review = await prisma.review.findUnique({
        where: {
            id: reviewId,
        },
    });

    return { ...review };
}
