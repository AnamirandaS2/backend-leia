/*
  Warnings:

  - Added the required column `lastRead` to the `Reading` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reading" ADD COLUMN     "lastRead" TIMESTAMP(3) NOT NULL;
