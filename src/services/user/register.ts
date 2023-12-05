import hash from 'bcrypt';

import prisma from '../../database/db';
import { SimpleUser } from '../../interfaces/user.interface';

export default async function registerService({ email, name, password}: SimpleUser) {
  const user = await prisma.user.create({
    data: {
      email,
      password: hash.hashSync(password, 12),
      name,
    }
  });

  return { ...user, id: undefined, password: undefined, updatedAt: undefined };
}