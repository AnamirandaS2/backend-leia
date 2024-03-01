/* eslint-disable @typescript-eslint/no-explicit-any */
import { hashSync } from 'bcrypt';

import supabase from '../../database/bucket';
import prisma from '../../database/db';
import parseFilename from '../../utils/parseFilename';

export default async function updateService({ id, name, password, avatar }) {
  const newInfo = {} as { name: string; password: string; avatar: string };
  
  name && (newInfo.name = name);
  password && (newInfo.password = hashSync(password, 12));

  if (avatar) {
    const bucket = await supabase.storage.getBucket('books');
    if (!bucket.data) 
    {
      await supabase.storage.createBucket('books', {
        public: false,
        fileSizeLimit: 52428800,
      });
    }
    
    const avatarObject = await supabase.storage.from('books').upload(parseFilename(`_avatar${  Math.floor(Math.random() * 10000)}`, id), (avatar as any).data, 
      {   cacheControl: '3600',
        upsert: false, 
        contentType: avatar.mimetype
      });

    if (avatarObject.error) {
      throw new Error('Avatar inválido');
    } 

    newInfo.avatar = avatarObject.data?.path;
  }
      
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: { ...newInfo, updatedAt: new Date() },
    select: {
      name: !!name,
      avatar: !!avatar,
      updatedAt: true,
    }

  });

  return user;
}