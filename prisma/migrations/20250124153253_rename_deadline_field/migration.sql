/*
  Warnings:

  - You are about to drop the column `finishingGoal` on the `ReadingTracking` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `ReadingTracking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReadingTracking" DROP COLUMN "finishingGoal",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;
