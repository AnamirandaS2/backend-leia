/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 } from 'uuid';

import supabase from '../../database/bucket';
import { SimpleUser } from '../../interfaces/user.interface';
import parseFilename from '../../utils/parseFilename';

export default async function storeAvatar(avatar: SimpleUser['avatar']): Promise<string> {
  if (!avatar) return '';
  
  const bucket = await supabase.storage.getBucket('books');
  if (!bucket.data) 
  {
    await supabase.storage.createBucket('books', {
      public: false,
      fileSizeLimit: 52428800,
    });
  }
      
  const avatarObject = await supabase.storage.from('books').upload(parseFilename(`_avatar${v4()}`), (avatar as any).data, 
    {   cacheControl: '3600',
      upsert: false, 
      contentType: avatar.mimetype
    });
  
  if (avatarObject.error) {
    throw new Error('Avatar inválido');
  } 
  
  return avatarObject.data?.path ?? '';
}