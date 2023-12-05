import hash from 'bcrypt';

import prisma from '../../database/db';

export default async function resetPasswordService(id: string, newPassword: string) {
  await prisma.user.update({ 
    where: { id }, 
    data: { 
      password: hash.hashSync(newPassword, 12)
    } 
  });
}