import supabase from '../../database/bucket';
import parseFilename from '../../utils/parseFilename';

export default async function findReviewService(reviewId: string) {
  const { data } = await supabase.storage.from('reviews').download(parseFilename('', reviewId));
  const text = await data?.text();
  
  return text;
}
