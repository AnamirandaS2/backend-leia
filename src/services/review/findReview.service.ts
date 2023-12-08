import supabase from '../../database/bucket';
import parseFilename from '../../utils/parseFilename';

export default async function findReviewService(name: string, title: string) {
  const { data } = await supabase.storage.from('reviews').download(parseFilename('', name, title));
  const text = await data?.text();

  return text;
}
