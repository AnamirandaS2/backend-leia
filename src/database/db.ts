import { PrismaClient } from "@prisma/client";

// Usa a DIRECT_URL (porta 5432) quando disponível para evitar problemas com o pooler (6543)
const runtimeDatabaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: runtimeDatabaseUrl,
    },
  },
});

export default prisma;
