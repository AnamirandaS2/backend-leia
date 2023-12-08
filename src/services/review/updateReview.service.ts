import * as fs from 'fs/promises';

import supabase from '../../database/bucket';
import prisma from '../../database/db';
import parseFilename from '../../utils/parseFilename';

interface UpdateReviewService { 
    title: string;
    reviewerName: string;
    newContent?: string;
    newTitle?: string;
    reviewId: string;
}

export default async function updateReviewService({ newContent, title, reviewerName, reviewId, newTitle }: UpdateReviewService) {
  const tempFilename = `./${parseFilename('', reviewerName, title)}`;

  await fs.appendFile(tempFilename, newContent);

  const file = await fs.readFile(tempFilename);

  await supabase.storage.from('reviews').update(parseFilename('', reviewerName, title), file, {
    cacheControl: '3600',
    upsert: false,
    contentType: 'text/markdown',
  });

  await supabase.storage.from('reviews').move(parseFilename('', reviewerName, title), parseFilename('', reviewerName, newTitle));

  await prisma.review.update({ 
    where: {
      id: reviewId
    }, 
    data: { 
      title: newTitle, 
      updatedAt: new Date() 
    } 
  });

  await fs.rm(tempFilename);
}