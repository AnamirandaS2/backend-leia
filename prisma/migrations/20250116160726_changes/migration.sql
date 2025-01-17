/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `RequestLending` table. All the data in the column will be lost.
  - You are about to drop the column `prisonId` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RequestLending" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "prisonId";

-- CreateTable
CREATE TABLE "RequestExtension" (
    "id" TEXT NOT NULL,
    "lendingId" TEXT NOT NULL,
    "extraTime" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestExtension_pkey" PRIMARY KEY ("id")
);
