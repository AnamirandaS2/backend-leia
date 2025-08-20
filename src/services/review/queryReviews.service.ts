import prisma from '../../database/db';

interface Props {
    bookTitle?: string;
    reviewTitle?: string;
    bookAuthor?: string;
    userName?: string;
    from?: string;
    to?: string;
    userId?: string;
    bookId?: string;
    requesterRole?: 'USER' | 'PROFESSOR' | 'ADMIN';
    requesterId?: string;
}

export default async function queryReviewsService({ 
  bookTitle, 
  reviewTitle, 
  bookAuthor, 
  userName, 
  from, 
  to,
  userId,
  bookId,
  requesterRole,
  requesterId,
}: Props) {
  let startDate = new Date(from || '1970-01-01');
  if (isNaN(startDate.getTime())) startDate = new Date('1970-01-01');
  let endDate = new Date(to || '2100-01-01');
  if (isNaN(endDate.getTime())) endDate = new Date('2100-01-01');

  const whereVisibility: any = {};
  if (requesterRole === 'PROFESSOR' || requesterRole === 'ADMIN') {
    // professor/admin vê tudo
  } else {
    // usuário comum só vê públicas dos outros e as próprias
    whereVisibility.OR = [
      { visibility: 'PUBLIC' },
      { userId: requesterId },
    ];
  }

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
        id: userId,
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
      bookId: bookId,
      ...whereVisibility,
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