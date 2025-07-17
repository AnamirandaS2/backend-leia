/*
  Warnings:

  - The primary key for the `ReadingTracking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lastRead` on the `ReadingTracking` table. All the data in the column will be lost.
  - The required column `id` was added to the `ReadingTracking` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "ReadingTracking" DROP CONSTRAINT "ReadingTracking_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTracking" DROP CONSTRAINT "ReadingTracking_userId_fkey";

-- AlterTable
ALTER TABLE "ReadingTracking" DROP CONSTRAINT "ReadingTracking_pkey",
DROP COLUMN "lastRead",
ADD COLUMN     "finished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "deadline" DROP NOT NULL,
ADD CONSTRAINT "ReadingTracking_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ReadingTracking" ADD CONSTRAINT "ReadingTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTracking" ADD CONSTRAINT "ReadingTracking_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
