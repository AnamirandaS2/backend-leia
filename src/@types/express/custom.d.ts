import { Book } from "@prisma/client";
import { ReadingTracking } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        name: string;
        email: string;
        role: "USER" | "PROFESSOR" | "ADMIN";
        approved?: boolean;
        avatar?: string;
      };
      book: Book;
      reading: ReadingTracking;
      readingTracking: ReadingTracking;
      review: {
        id: string;
        title: string;
        [key: string]: any;
      };
    }
  }
}
