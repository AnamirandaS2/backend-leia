import { PrismaClient } from "@prisma/client";

// Usa DATABASE_URL (porta 6543) para conexão mais estável
const runtimeDatabaseUrl = process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: runtimeDatabaseUrl,
    },
  },
});

export default prisma;
