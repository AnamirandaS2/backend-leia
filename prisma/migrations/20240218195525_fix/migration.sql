/*
  Warnings:

  - Added the required column `borrowDate` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `director` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prisionName` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnDate` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCompleteName` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "borrowDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "director" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "prisionName" TEXT NOT NULL,
ADD COLUMN     "returnDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userCompleteName" TEXT NOT NULL;
