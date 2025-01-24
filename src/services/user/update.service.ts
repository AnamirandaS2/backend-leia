import { hashSync } from 'bcrypt';

import prisma from '../../database/db';

interface UpdateServiceData {
  id: string;
  name?: string;
  password?: string;
  avatar?: string;
}

export default async function updateService({ id, name, password, avatar }: UpdateServiceData) {
  const newInfo = {} as { name: string; password: string; avatar: string };
  
  name && (newInfo.name = name);
  password && (newInfo.password = hashSync(password, 12));
  avatar && (newInfo.avatar = avatar);
      
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