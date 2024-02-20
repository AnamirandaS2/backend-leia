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
  let startDate = new Date(from || '1970-01-01');
  if (isNaN(startDate.getTime())) startDate = new Date('1970-01-01');
  let endDate = new Date(to || '2100-01-01');
  if (isNaN(endDate.getTime())) endDate = new Date('2100-01-01');

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
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      book: {
        select: {
          author: true,
          title: true,
        } 
      },
      user: {
        select: {
          name: true,
          avatar: true,
          id: true,
        }
      }
    },
  });
    
  const result = reviews.map(review => {
    const copy = { ...review, userId: undefined };
    delete copy.userId;
    return { ...copy };
  });

  return result;
}