#!/bin/sh

# Aguardar o banco de dados estar disponível
echo "Aguardando banco de dados..."
sleep 10

# Executar migrações do Prisma (pode pular com SKIP_MIGRATIONS=true)
if [ "$SKIP_MIGRATIONS" = "true" ]; then
  echo "SKIP_MIGRATIONS=true → Pulando prisma migrate deploy"
else
  echo "Executando migrações do Prisma..."
  npx prisma migrate deploy || {
    echo "Falha ao executar migrações. Verifique a variável DIRECT_URL (porta 5432).";
    exit 1;
  }
fi

# Gerar cliente Prisma (já gerado no build da imagem). Pulando em runtime para evitar erros de permissão.
echo "Pulando prisma generate em runtime (já gerado no build)."

# Iniciar a aplicação
echo "Iniciando aplicação..."
node dist/server.js
