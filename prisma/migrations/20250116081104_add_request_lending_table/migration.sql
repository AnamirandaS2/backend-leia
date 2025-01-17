/*
  Warnings:

  - Made the column `returnDate` on table `BorrowedBook` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BorrowedBook" ALTER COLUMN "returnDate" SET NOT NULL;

-- CreateTable
CREATE TABLE "RequestLending" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "requestAt" TIMESTAMP(3) NOT NULL,
    "lendingDuration" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestLending_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequestLending" ADD CONSTRAINT "RequestLending_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestLending" ADD CONSTRAINT "RequestLending_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
