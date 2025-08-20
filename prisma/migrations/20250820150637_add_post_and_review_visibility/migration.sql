-- CreateEnum
CREATE TYPE "PostVisibility" AS ENUM ('PUBLIC', 'PROFESSOR_ONLY');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "visibility" "PostVisibility" NOT NULL DEFAULT 'PUBLIC';
