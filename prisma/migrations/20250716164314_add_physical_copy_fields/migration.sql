-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "hasPhysicalCopy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "physicalCopyQuantity" INTEGER;
