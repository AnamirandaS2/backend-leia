export interface User {
  id?: string;
  name?: string;
  email?: string;
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

  declare global {
    namespace Express {
      export interface Request {
        user: User;
        review: Review;
        book: Book;
        admin: Admin;
      }
    }
  }
  
export default global;
