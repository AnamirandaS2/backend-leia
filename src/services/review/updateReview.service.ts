import * as fs from 'fs/promises';

import supabase from '../../database/bucket';
import parseFilename from '../../utils/parseFilename';

interface UpdateReviewService { 
    title: string;
    reviewerName: string;
    newContent?: string;
    newTitle?: string;
}

export default async function updateReviewService({ newContent, title, reviewerName }: UpdateReviewService) {
  const tempFilename = `./${parseFilename('', reviewerName, title)}`;

  await fs.appendFile(tempFilename, newContent);

  const file = await fs.readFile(tempFilename);

  await supabase.storage.from('reviews').update(parseFilename('', reviewerName, title), file, {
    cacheControl: '3600',
    upsert: false,
    contentType: 'text/markdown',
  });

  await fs.rm(tempFilename);
}