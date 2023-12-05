import * as fs from 'fs/promises';

import supabase from '../../database/bucket';
import prisma from '../../database/db';
import parseFilename from '../../utils/parseFilename';

interface Props {
    content: string;
    bookId: string;
    title: string;
    userId: string;
    name: string;
}

export default async function createReviewService({ bookId, content, title, userId, name }: Props) {
  const tempFilename = `./${parseFilename('', name, title)}`;

  const bucket = await supabase.storage.getBucket('reviews');
  if (!bucket.data) {
    await supabase.storage.createBucket('reviews', {
      public: false,
      allowedMimeTypes: ['text/markdown'],
      fileSizeLimit: 10240,
    });
  }
    
  await fs.appendFile(tempFilename, content);

  const file = await fs.readFile(tempFilename);

  await supabase.storage.from('reviews').upload(parseFilename('', name, title), file, {
    cacheControl: '3600',
    upsert: false,
    contentType: 'text/markdown',
  });
  
  await fs.rm(tempFilename);

  const review = await prisma.review.create({ data: {
    title,
    userId,
    bookId,
  }});
    
  return { ...review, userId: undefined };

}