# Autenticação JWT - Carona VIP

Sistema de autenticação implementado com JWT (JSON Web Tokens).

## 🔐 Funcionalidades

- ✅ Registro de usuários com hash de senha (bcrypt)
- ✅ Login com validação de credenciais
- ✅ Geração de tokens JWT
- ✅ Middleware de autenticação
- ✅ Middleware de autorização por roles
- ✅ Proteção de rotas

## 📋 Endpoints de Autenticação

### POST `/api/auth/register`
Registra um novo usuário.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123",
  "phone": "11999999999",
  "role": "STANDARD"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "STANDARD",
    "phone": "11999999999"
  }
}
```

### POST `/api/auth/login`
Faz login e retorna token JWT.

**Request Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "STANDARD"
  }
}
```

### GET `/api/auth/me`
Obtém informações do usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Token válido",
  "user": {
    "id": "uuid",
    "email": "joao@example.com",
    "role": "STANDARD"
  }
}
```

## 🔒 Como Usar o Token

### Em Requisições HTTP

Adicione o header `Authorization` com o token:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Exemplo com cURL

```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer seu_token_aqui"
```

### Exemplo com JavaScript/Fetch

```javascript
const token = 'seu_token_aqui';

fetch('http://localhost:3000/api/users', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🛡️ Proteção de Rotas

### Middleware `authenticate`
Protege rotas que requerem autenticação:

```typescript
import { authenticate } from '../middleware/auth';

router.get('/protected', authenticate, controller.method);
```

### Middleware `authorize`
Protege rotas que requerem roles específicas:

```typescript
import { authenticate, authorize } from '../middleware/auth';

// Apenas ADMIN pode deletar
router.delete('/:id', authenticate, authorize('ADMIN'), controller.delete);
```

### Exemplo de Uso

```typescript
// Rota pública (sem autenticação)
router.post('/auth/register', controller.register);

// Rota protegida (requer autenticação)
router.get('/users', authenticate, controller.findAll);

// Rota com autorização (requer role específica)
router.delete('/users/:id', authenticate, authorize('ADMIN'), controller.delete);
```

## 📝 Variáveis de Ambiente

Adicione ao arquivo `.env`:

```env
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

**⚠️ IMPORTANTE**: 
- Use uma chave secreta forte em produção
- Não commite o `.env` no repositório
- O `JWT_EXPIRES_IN` pode ser: `1h`, `7d`, `30d`, etc.

## 🎭 Roles Disponíveis

- `STANDARD` - Usuário padrão
- `DRIVER` - Motorista
- `ADMIN` - Administrador

## 📦 Estrutura de Arquivos

```
backend/src/
├── middleware/
│   └── auth.ts              # Middlewares de autenticação e autorização
├── services/
│   └── auth.service.ts      # Lógica de autenticação (login, register)
├── controllers/
│   └── auth.controller.ts   # Controllers de autenticação
├── routes/
│   └── auth.routes.ts       # Rotas de autenticação
└── types/
    └── jwt.ts               # Tipos TypeScript para JWT
```

## 🔍 Rotas Protegidas

As seguintes rotas estão protegidas com autenticação:

- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Buscar usuário
- `POST /api/users` - Criar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário (apenas ADMIN)

## 🧪 Testando

### 1. Registrar um usuário

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste User",
    "email": "teste@example.com",
    "password": "senha123"
  }'
```

### 2. Fazer login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "password": "senha123"
  }'
```

### 3. Usar o token

Copie o token da resposta e use:

```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🐛 Tratamento de Erros

### Erros Comuns

- **401 Unauthorized**: Token não fornecido ou inválido
- **403 Forbidden**: Token válido mas sem permissão (role)
- **400 Bad Request**: Dados inválidos no registro/login

### Exemplo de Resposta de Erro

```json
{
  "status": "error",
  "message": "Token de autenticação não fornecido"
}
```

## 📚 Documentação Swagger

Acesse `http://localhost:3000/api-docs` para ver a documentação interativa com exemplos de uso do JWT.

