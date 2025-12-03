FROM node:20-alpine

WORKDIR /app

# Instalar dependências do sistema necessárias para o Prisma, PostgreSQL e bcrypt
RUN apk add --no-cache \
    openssl \
    postgresql-client \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma

# Instalar dependências (incluindo bcrypt que precisa compilar)
# Usar npm install para garantir que todas as dependências sejam instaladas
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 3000

# Comando padrão (será sobrescrito pelo docker-compose)
CMD ["npm", "run", "dev"]

