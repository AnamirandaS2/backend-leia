/*
  Warnings:

  - You are about to drop the column `publishedAt` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "page" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "publishedAt";
