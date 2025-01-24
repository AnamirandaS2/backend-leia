/*
  Warnings:

  - Added the required column `finishingGoal` to the `ReadingTracking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReadingTracking" ADD COLUMN     "finishingGoal" TIMESTAMP(3) NOT NULL;
