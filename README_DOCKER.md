# Docker Setup - Carona VIP

Este projeto utiliza Docker Compose para facilitar o desenvolvimento e deploy.

## 📋 Pré-requisitos

- Docker Desktop ou Docker Engine instalado
- Docker Compose instalado

## 🚀 Como usar

### 1. Iniciar os serviços

```bash
docker-compose up -d
```

Este comando irá:
- Criar e iniciar o container do PostgreSQL
- Criar e iniciar o container do backend
- Criar e iniciar o container do frontend
- Executar as migrations do Prisma automaticamente
- Iniciar o servidor backend na porta 3000
- Iniciar o servidor frontend na porta 5173

### 2. Ver logs

```bash
# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs apenas do backend
docker-compose logs -f backend

# Ver logs apenas do PostgreSQL
docker-compose logs -f postgres
```

### 3. Parar os serviços

```bash
docker-compose down
```

### 4. Parar e remover volumes (limpar dados)

```bash
docker-compose down -v
```

⚠️ **Atenção**: Isso irá remover todos os dados do banco de dados!

### 5. Reconstruir os containers

```bash
docker-compose up -d --build
```

## 🔧 Configuração

### Variáveis de Ambiente

O docker-compose.yml já está configurado com as seguintes variáveis:

- **PostgreSQL**:
  - Usuário: `carona_user`
  - Senha: `carona_password`
  - Banco: `carona_vip`
  - Porta: `5432`

- **Backend**:
  - Porta: `3000`
  - DATABASE_URL: Configurada automaticamente para conectar ao PostgreSQL do Docker

### Personalizar configurações

Para alterar as credenciais do banco, edite o arquivo `docker-compose.yml`:

```yaml
environment:
  POSTGRES_USER: seu_usuario
  POSTGRES_PASSWORD: sua_senha
  POSTGRES_DB: seu_banco
```

E atualize a `DATABASE_URL` no serviço do backend:

```yaml
DATABASE_URL: postgresql://seu_usuario:sua_senha@postgres:5432/seu_banco?schema=public
```

## 🌐 Acessar as aplicações

Após iniciar com `docker-compose up -d`:

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000`
- **Swagger Documentation**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/health`
- **PostgreSQL**: `localhost:5432`

## 📊 Acessar o banco de dados

### Via Docker

```bash
docker-compose exec postgres psql -U carona_user -d carona_vip
```

### Via cliente externo

- Host: `localhost`
- Porta: `5432`
- Usuário: `carona_user`
- Senha: `carona_password`
- Banco: `carona_vip`

## 🛠️ Comandos úteis

### Executar migrations manualmente

```bash
docker-compose exec backend npx prisma migrate dev
```

### Abrir Prisma Studio

```bash
docker-compose exec backend npx prisma studio
```

Acesse: `http://localhost:5555`

### Executar comandos no backend

```bash
docker-compose exec backend npm run <comando>
```

### Reiniciar um serviço específico

```bash
docker-compose restart backend
docker-compose restart frontend
docker-compose restart postgres
```

### Ver logs do frontend

```bash
docker-compose logs -f frontend
```

### Executar comandos no frontend

```bash
docker-compose exec frontend npm run <comando>
```

## 🔍 Verificar status dos serviços

```bash
docker-compose ps
```

## 📝 Notas

- Os dados do PostgreSQL são persistidos em um volume Docker chamado `postgres_data`
- O código do backend é montado como volume, então alterações no código são refletidas automaticamente
- O `node_modules` não é montado como volume para melhor performance

## 🐛 Troubleshooting

### Erro de conexão com o banco

1. Verifique se o PostgreSQL está rodando:
   ```bash
   docker-compose ps
   ```

2. Verifique os logs:
   ```bash
   docker-compose logs postgres
   ```

3. Aguarde o healthcheck do PostgreSQL completar antes de iniciar o backend

### Erro nas migrations

1. Pare os serviços:
   ```bash
   docker-compose down
   ```

2. Remova os volumes (⚠️ isso apaga os dados):
   ```bash
   docker-compose down -v
   ```

3. Inicie novamente:
   ```bash
   docker-compose up -d
   ```

### Porta já em uso

Se a porta 3000 ou 5432 já estiverem em uso, você pode alterar no `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Mude 3001 para outra porta disponível
```

