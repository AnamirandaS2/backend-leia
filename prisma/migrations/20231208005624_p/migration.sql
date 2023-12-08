/*
  Warnings:

  - You are about to drop the column `authorityLevel` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "authorityLevel" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "sentAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "authorityLevel";
