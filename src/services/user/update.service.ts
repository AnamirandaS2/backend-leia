import { hashSync } from 'bcrypt';

import prisma from '../../database/db';

export default async function updateService({ id, name, password, avatar }) {
  const newInfo = {} as { name: string; password: string; avatar: string };
  
  name && (newInfo.name = name);
  password && (newInfo.password = hashSync(password, 12));
  avatar && (newInfo.avatar = avatar);
      
  console.error('IJDAWIOsjdiosajidjwio');
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: { ...newInfo },
    select: {
      name: !!name,
      avatar: !!avatar,
      updatedAt: true,
    }

  });

  console.error(user);
  return user;
}