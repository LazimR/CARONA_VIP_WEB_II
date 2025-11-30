# Backend - Carona VIP

Backend desenvolvido com Express.js e Prisma ORM.

## 📁 Estrutura do Projeto

```
backend/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── src/
│   ├── controllers/           # Controladores (lógica de requisições)
│   ├── services/              # Serviços (lógica de negócio)
│   ├── routes/                # Rotas da API
│   ├── middleware/            # Middlewares customizados
│   ├── utils/                 # Utilitários
│   ├── types/                 # Tipos TypeScript
│   └── server.ts              # Arquivo principal do servidor
├── .env                       # Variáveis de ambiente (não versionado)
├── .env.example              # Exemplo de variáveis de ambiente
├── package.json
└── tsconfig.json
```

## 🚀 Como usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do backend com base no `.env.example`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/carona_vip?schema=public"
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
MERCADOPAGO_ACCESS_TOKEN=your_access_token_here
```

### 3. Configurar o banco de dados

```bash
# Gerar o cliente Prisma
npm run prisma:generate

# Criar e executar migrations
npm run prisma:migrate

# (Opcional) Abrir Prisma Studio para visualizar dados
npm run prisma:studio
```

### 4. Executar o servidor

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção (após build)
npm run build
npm start
```

## 📝 Scripts disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Inicia o servidor em modo produção
- `npm run prisma:generate` - Gera o cliente Prisma
- `npm run prisma:migrate` - Executa migrations do banco
- `npm run prisma:studio` - Abre o Prisma Studio

## 🏗️ Arquitetura

### Controllers
Responsáveis por receber requisições HTTP e retornar respostas. Devem ser leves e delegar a lógica de negócio para os Services.

### Services
Contêm a lógica de negócio da aplicação. Podem interagir com o banco de dados através do Prisma Client.

### Routes
Definem os endpoints da API e conectam às rotas aos controllers.

### Middleware
Funções que executam antes das rotas, como tratamento de erros, validação, autenticação, etc.

### Utils
Funções utilitárias reutilizáveis, como configuração do Prisma Client.

## 🔧 Exemplo de uso

### Criar um novo recurso

1. **Criar o modelo no Prisma** (`prisma/schema.prisma`):
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

2. **Criar o Service** (`src/services/user.service.ts`):
```typescript
import prisma from '../utils/prisma';

export class UserService {
  async findAll() {
    return await prisma.user.findMany();
  }
  
  async create(data: { email: string; name?: string }) {
    return await prisma.user.create({ data });
  }
}
```

3. **Criar o Controller** (`src/controllers/user.controller.ts`):
```typescript
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  private userService = new UserService();

  async findAll(req: Request, res: Response) {
    const users = await this.userService.findAll();
    res.json(users);
  }
}
```

4. **Criar as Rotas** (`src/routes/user.routes.ts`):
```typescript
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
const userController = new UserController();

router.get('/', asyncHandler(userController.findAll.bind(userController)));

export default router;
```

5. **Registrar as rotas** (`src/routes/index.ts`):
```typescript
import userRoutes from './user.routes';

router.use('/users', userRoutes);
```

## 📚 Documentação

- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

