import { Role } from '@prisma/client';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  approved?: boolean;
  role?: Role;
}
  
export interface Admin {
  id?: string;
  name?: string;
  email?: string;
  authorityLevel?: number;
}

export interface Review {
  id?: string;
  userId?: string;
  bookId?: string;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  finished?: boolean;
}  
  
export interface Book {
  id?: string;
  title?: string;
  description?: string;
  author?: string;
  genre?: string;
  pages?: number;
  cover?: string;
  source?: string;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Pendency = {
  book: {
    author: string;
    title: string;
    id: string;
  };
  borrowDate: Date;
  returnDate: Date;
}
