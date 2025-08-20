-- CreateEnum
CREATE TYPE "ReviewVisibility" AS ENUM ('PUBLIC', 'PROFESSOR_ONLY');

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "visibility" "ReviewVisibility" NOT NULL DEFAULT 'PUBLIC';
