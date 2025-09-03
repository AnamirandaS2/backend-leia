-- Criar tabela Quote
CREATE TABLE IF NOT EXISTS "Quote" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "curiosity" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Adicionar chave primária
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_pkey" PRIMARY KEY ("id");

-- Criar índice único para a data
CREATE UNIQUE INDEX IF NOT EXISTS "Quote_date_key" ON "Quote"("date");

