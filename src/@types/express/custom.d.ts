export interface User {
    id?: string;
    name?: string;
    email?: string;
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
  
  declare global {
    namespace Express {
      export interface Request {
        user: User;
        review: Review;
      }
    }
  }
  
export default global;
