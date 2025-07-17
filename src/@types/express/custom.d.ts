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
      };
      book: Book;
      reading: ReadingTracking;
    }
  }
}
