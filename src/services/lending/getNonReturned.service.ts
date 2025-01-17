import prisma from '../../database/db';

export default async function getNonReturnedBooksService() {
  const nonReturnedBooks = await prisma.borrowedBook.findMany({
    where: {
      returned: false
    },
    select: {
      borrowDate: true,
      returnDate: true,
      book: {
        select: {
          title: true,
          author: true,
          cover: true,
          id: true,
          description: true,
        }
      },
      user: {
        select: {
          name: true,
          id: true,
          email: true,
          avatar: true,
        }
      }
    }
  });
  
  return nonReturnedBooks;
}