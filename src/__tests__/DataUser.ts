import hash from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

export const userLogin = {
  email : 'teste@gmail.com', 
  name : 'TesteMan', 
  password : '12345678',
};

export const adminLogin = {
  email : 'teste@gmail.com', 
  name : 'TesteMan', 
  password : '12345678',
};

export const user = {
  id : uuidv4(),
  name : userLogin.name,
  email : userLogin.email,
  password : hash.hashSync(userLogin.password, 12),
  avatar : null,
  approved: false,
  createdAt : new Date(),
  updatedAt : new Date(),
};

export const admin = {
  id : uuidv4(),
  name : adminLogin.name,
  email : adminLogin.email,
  password : hash.hashSync(adminLogin.password, 12),
  avatar : null,
  authorityLevel : 1,
  createdAt : new Date(),
  updatedAt : new Date(),
};