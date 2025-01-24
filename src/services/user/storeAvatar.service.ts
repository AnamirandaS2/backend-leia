import supabase from '../../database/bucket';
import { SimpleUser } from '../../interfaces/user.interface';
import parseFilename from '../../utils/parseFilename';

export default async function storeAvatar(userId: string, avatar: SimpleUser['avatar']): Promise<string> {
  if (!avatar) return '';
  
  const bucket = await supabase.storage.getBucket('avatars');
  if (!bucket.data) 
  {
    await supabase.storage.createBucket('avatars', {
      public: false,
      fileSizeLimit: 52428800,
    });
  }
  
  const filename = parseFilename(`avatar-${userId}`);

  const avatarObject = await supabase.storage.from('avatars').upload(filename, (avatar as any).data, 
    {   cacheControl: '3600',
      upsert: false, 
      contentType: avatar.mimetype
    });
  
  if (avatarObject.error) {
    throw new Error('Avatar inválido');
  } 
  
  const { data: { publicUrl }} = supabase.storage.from('avatars').getPublicUrl(filename)
  return publicUrl;
}