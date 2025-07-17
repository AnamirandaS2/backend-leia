/*
  Warnings:

  - You are about to drop the column `collectionId` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_collectionId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "collectionId";

-- CreateTable
CREATE TABLE "BooksOnCollections" (
    "bookId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "BooksOnCollections_pkey" PRIMARY KEY ("bookId","collectionId")
);

-- AddForeignKey
ALTER TABLE "BooksOnCollections" ADD CONSTRAINT "BooksOnCollections_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksOnCollections" ADD CONSTRAINT "BooksOnCollections_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
