# Use Node.js 18 Alpine como base
FROM node:18-alpine

# Instalar dependências do sistema necessárias
RUN apk add --no-cache \
    curl \
    && rm -rf /var/cache/apk/*

# Definir diretório de trabalho
WORKDIR /app

# Evitar download do PhantomJS (não disponível para linux/arm64)
ENV PHANTOMJS_SKIP_DOWNLOAD=true

# Copiar arquivos de dependências
COPY package*.json ./
COPY yarn.lock ./

# Instalar dependências
RUN yarn install --frozen-lockfile --production=false

# Copiar código fonte
COPY . .

# Gerar cliente Prisma
RUN npx prisma generate

# Build da aplicação
RUN yarn build

# Remover dependências de desenvolvimento
RUN yarn install --production=true && yarn cache clean

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copiar script de inicialização
COPY start.sh ./
RUN chmod +x start.sh

# Criar diretório para uploads
RUN mkdir -p /app/public/images && chown -R nextjs:nodejs /app/public

# Mudar para usuário não-root
USER nextjs

# Expor porta
EXPOSE 3000

# Comando de inicialização
CMD ["./start.sh"]
