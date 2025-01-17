import { User, Review, Book, Admin } from '../types';

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
