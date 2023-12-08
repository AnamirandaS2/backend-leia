/*
  Warnings:

  - You are about to drop the column `authorityLevel` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "authorityLevel" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "sentAt" TIMESTAMP(3),
ALTER COLUMN "genre" SET NOT NULL,
ALTER COLUMN "genre" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "authorityLevel";

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");
