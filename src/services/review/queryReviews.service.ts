import prisma from '../../database/db';

interface Props {
    bookTitle?: string;
    reviewTitle?: string;
    bookAuthor?: string;
    userName?: string;
    from?: string;
    to?: string;
}

export default async function queryReviewsService({ 
  bookTitle, 
  reviewTitle, 
  bookAuthor, 
  userName, 
  from, 
  to 
}: Props) {
  const reviews = await prisma.review.findMany({ 
    where: {
      title: {
        contains: reviewTitle,
        mode: 'insensitive',
      },
      user: {
        name: {
          contains: userName,
          mode: 'insensitive',
        },
      },
      book: {
        title: {
          contains: bookTitle,
          mode: 'insensitive',
        },
        author: {
          contains: bookAuthor,
          mode: 'insensitive',
        },
      },
      createdAt: {
        gte: new Date(from ?? '1970-01-01'),
        lte: new Date(to ?? '2100-01-01'),
      },
    },
    include: {
      book: {
        select: {
          author: true,
          title: true,
        } 
      }
    },
  });
    
  return reviews.map(review => {
    delete review.userId;
    return { ...review };
  });
}