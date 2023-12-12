import hash from 'bcrypt';
import { Request } from 'express';
import prisma from '../database/db';
import { SimpleUser } from '../interfaces/user.interface';

export default async function registerService({ email, name, password}: SimpleUser, req : Request){
  
  var user = null;
  const rota = req.baseUrl;
  
  if (rota == '/user')
  {
    user = await prisma.user.create({
      data: {
        email,
        password: hash.hashSync(password, 12),
        name,
      }}
    );
  } else if(rota == '/admin')
  {
    user = await prisma.admin.create({
      data: {
        email,
        password: hash.hashSync(password, 12),
        name,
      }}
    );
  }
  
  return { ...user, id: undefined, password: undefined, updatedAt: undefined };
}