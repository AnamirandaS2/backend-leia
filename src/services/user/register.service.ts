import { User } from '@prisma/client';
import hash from 'bcrypt';

import prisma from '../../database/db';

type RegisterData = {
  email: User['email'];
  name: User['name'];
  password: User['password'];
  avatar: User['avatar'];
  role?: User['role'];
}

export default async function registerService({ email, name, password, avatar, role }: RegisterData){
  const user = await prisma.user.create(
    {
      data: {
        email,
        password: hash.hashSync(password, 12),
        name,
        avatar,
        role,
        approved: role && role !== 'USER',
      }
    }
  );

  return { ...user, id: undefined, password: undefined, updatedAt: undefined };
}