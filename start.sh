#!/bin/sh

# Aguardar o banco de dados estar disponível
echo "Aguardando banco de dados..."
sleep 10

# Executar migrações do Prisma
echo "Executando migrações do Prisma..."
npx prisma migrate deploy

# Gerar cliente Prisma
echo "Gerando cliente Prisma..."
npx prisma generate

# Iniciar a aplicação
echo "Iniciando aplicação..."
node dist/server.js
