import supabase from "../../database/bucket";
import parseFilename from "../../utils/parseFilename";

export default async function deleteAvatar(userId: string) {
  const filename = parseFilename(`avatar-${userId}`);
  await supabase.storage.from('avatars').remove([filename]);
}