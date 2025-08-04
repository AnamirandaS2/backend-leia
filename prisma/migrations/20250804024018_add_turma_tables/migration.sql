/*
  Warnings:

  - You are about to drop the `BooksOnCollections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BooksOnCollections" DROP CONSTRAINT "BooksOnCollections_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BooksOnCollections" DROP CONSTRAINT "BooksOnCollections_collectionId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "collectionId" TEXT;

-- DropTable
DROP TABLE "BooksOnCollections";

-- CreateTable
CREATE TABLE "Turma" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "professorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TurmaAluno" (
    "id" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TurmaAluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TurmaAluno_turmaId_userId_key" ON "TurmaAluno"("turmaId", "userId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TurmaAluno" ADD CONSTRAINT "TurmaAluno_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TurmaAluno" ADD CONSTRAINT "TurmaAluno_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
