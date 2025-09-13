# 🚀 Como Usar - Docker Compose Simples

## 📁 **Arquivos Criados**

- `docker-compose.yml` - Versão principal
- `docker-compose.coolify.yml` - Versão para Coolify

## ⚙️ **Configuração no Coolify**

### 1. **Docker Compose Location**
```
/docker-compose.coolify.yml
```

### 2. **Variáveis de Ambiente**
Configure no Coolify:
```bash
DATABASE_URL=postgresql://usuario:senha@host:porta/banco
JWT_SECRET=sua_chave_jwt_forte
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app
EMAIL_FROM=noreply@leiaimperatriz.com
```

### 3. **Deploy**
1. Clique em **"Redeploy"**
2. Aguarde o build
3. Teste: `http://seu-dominio/health`

## 🔧 **Configuração Local**

### 1. **Criar arquivo .env**
```bash
cp env.example .env
# Edite o .env com suas configurações
```

### 2. **Executar localmente**
```bash
docker compose up -d
```

### 3. **Testar**
```bash
curl http://localhost:3000/health
```

## ✅ **Estrutura Simples**

- ✅ Sem redes complexas
- ✅ Sem health checks desnecessários
- ✅ Sem volumes externos
- ✅ Apenas o essencial
- ✅ Seguindo padrão do seu exemplo

## 🎯 **Resultado Esperado**

Após o deploy:
- Container rodando na porta 3000
- API acessível via HTTP
- Health check funcionando
- Documentação em `/docs`
