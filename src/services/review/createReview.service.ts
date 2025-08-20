import * as fs from 'fs/promises';

import { v4 as uuidv4 } from 'uuid';

import supabase from '../../database/bucket';
import prisma from '../../database/db';
import parseFilename from '../../utils/parseFilename';

interface Props {
  bookId: string;
  borrowDate: string;
  returnDate: string;  
  userId: string;
  visibility?: 'PUBLIC' | 'PROFESSOR_ONLY';
}

export default async function createReviewService({ bookId, borrowDate, returnDate, userId, visibility }: Props) {
  const reviewId = uuidv4();
  const tempFilename = `./${parseFilename('', reviewId)}`;

  const bucket = await supabase.storage.getBucket('reviews');
  if (!bucket.data) {
    await supabase.storage.createBucket('reviews', {
      public: false,
      allowedMimeTypes: ['text/markdown'],
      fileSizeLimit: 10240,
    });
  }
    
  await fs.appendFile(tempFilename, '');

  const file = await fs.readFile(tempFilename);
  
  await supabase.storage.from('reviews').upload(parseFilename('', reviewId ), file, {
    cacheControl: '3600',
    upsert: false,
    contentType: 'text/markdown',
  });
  
  await fs.rm(tempFilename);

  const review = await prisma.review.create({ data: {
    id: reviewId,
    title: 'Nova resenha',
    borrowDate,
    returnDate,
    bookId,
    userId,
    visibility: visibility || 'PUBLIC',
  }});
    
  return { ...review, userId: undefined };

}