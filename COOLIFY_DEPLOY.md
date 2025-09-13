# 🚀 Deploy no Coolify - Backend Leia Imperatriz

## 📋 Pré-requisitos

1. **Banco de dados PostgreSQL** já configurado
2. **Conta no Supabase** para armazenamento de arquivos
3. **Configuração de email** (Gmail, SendGrid, etc.)

## 🔧 Configuração no Coolify

### 1. Criar Nova Aplicação

1. Acesse seu painel do Coolify
2. Clique em "New Application"
3. Selecione "Docker Compose"
4. Cole o conteúdo do `docker-compose.yml`

### 2. Configurar Variáveis de Ambiente

No painel do Coolify, adicione as seguintes variáveis:

```bash
# Servidor
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Banco de Dados (substitua pelos seus dados)
DATABASE_URL=postgresql://usuario:senha@host:porta/nome_do_banco?schema=public

# JWT (gere uma chave forte)
JWT_SECRET=sua_chave_jwt_super_secreta_aqui

# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_do_supabase

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app
EMAIL_FROM=noreply@leiaimperatriz.com
```

### 3. Configurar Domínio

1. No Coolify, vá em "Domains"
2. Adicione seu domínio (ex: `api.leiaimperatriz.com`)
3. Configure SSL se necessário

### 4. Deploy

1. Clique em "Deploy"
2. Aguarde o build e deploy
3. Verifique os logs para garantir que tudo está funcionando

## 🔍 Verificação Pós-Deploy

### Health Check
Acesse: `https://seu-dominio.com/health`

Deve retornar:
```json
{
  "status": "OK",
  "message": "API está funcionando corretamente",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "version": "1.0.0"
}
```

### Documentação da API
Acesse: `https://seu-dominio.com/docs`

## 🛠️ Comandos Úteis

### Executar Migrações do Prisma
```bash
# No terminal do Coolify ou via SSH
npx prisma migrate deploy
```

### Reset do Banco (cuidado!)
```bash
npx prisma migrate reset
```

### Gerar Cliente Prisma
```bash
npx prisma generate
```

## 📊 Monitoramento

### Logs
- Acesse a aba "Logs" no Coolify
- Monitore erros e performance

### Métricas
- CPU e memória na aba "Resources"
- Requests na aba "Analytics"

## 🔧 Troubleshooting

### Erro de Conexão com Banco
1. Verifique se `DATABASE_URL` está correto
2. Teste conectividade do banco
3. Verifique se as migrações foram executadas

### Erro de Upload de Arquivos
1. Verifique configurações do Supabase
2. Teste as chaves de API
3. Verifique permissões do bucket

### Erro de Email
1. Verifique configurações SMTP
2. Teste com senha de app (Gmail)
3. Verifique firewall/portas

## 📝 Notas Importantes

- **Backup**: Configure backup automático do banco
- **SSL**: Sempre use HTTPS em produção
- **Monitoramento**: Configure alertas para downtime
- **Updates**: Mantenha dependências atualizadas

## 🆘 Suporte

Em caso de problemas:
1. Verifique os logs no Coolify
2. Teste localmente com Docker
3. Verifique configurações de ambiente
4. Consulte documentação do Prisma/Supabase
