import hash from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

export const userLogin = {
  email : 'teste@gmail.com', 
  name : 'TesteMan', 
  password : '12345678',
};

export const adminLogin = {
  email : 'testeAdmin@gmail.com', 
  name : 'TesteMan_Admin', 
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

export const book = {
  id : uuidv4(),
  title : 'Sherlock Homes e os 4 signos',
  description : 'Sherlock Holmes é um detetive britânico enigmático e pedante do final do século XX.',
  author : 'Arthur Conan Doyle',
  source: 'supabase.com/base',
  cover : 'supabase.com/base',
  genre: 'Romance',
  pages: 207,
  enabled : true,
  publishedAt: new Date(),
  createdAt : new Date(),
  updatedAt : new Date(),
  sentAt : null,
};

export const review = {
  id: uuidv4(),
  userId : user.id,
  bookId : book.id,
  title : 'Resenha n1',
  approved : true,
  finished : true,
  createdAt : new Date(),
  updatedAt : new Date(),
};
