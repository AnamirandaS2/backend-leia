/* eslint-disable @typescript-eslint/no-explicit-any */
import hash from 'bcrypt';
import { Request } from 'express';
import { v4 } from 'uuid';

import supabase from '../../database/bucket';
import prisma from '../../database/db';
import { AppError } from '../../error';
import { SimpleUser } from '../../interfaces/user.interface';
import parseFilename from '../../utils/parseFilename';

export default async function registerService({ email, name, password, avatar }: SimpleUser, req : Request){
  
  const rota = req.baseUrl;
  
  if (rota == '/user')
  {
    let avatarURL: string = '';
    if (avatar) {
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
  
      avatarURL = avatarObject.data?.path;
    }

    const user = await prisma.user.create(
      {
        data: {
          email,
          password: hash.hashSync(password, 12),
          name,
          avatar: avatarURL
        }
      }
    );

    return { ...user, id: undefined, password: undefined, updatedAt: undefined };

  } else if(rota == '/admin')
  {
    const admin = await prisma.admin.create(
      {
        data: {
          email,
          password: hash.hashSync(password, 12),
          name,
          authorityLevel: 2
        }
      }
    );
    
    return { ...admin, id: undefined, password: undefined, updatedAt: undefined };
  }
  else
  {
    const error = new AppError('Erro Interno no Servidor.', 500);
    throw error;
  }
  
}