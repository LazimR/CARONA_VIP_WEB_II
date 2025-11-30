#!/bin/sh
# Script de inicialização do banco de dados

set -e

echo "🔄 Gerando Prisma Client..."
npx prisma generate

echo "🔄 Executando migrations..."
npx prisma migrate deploy

echo "✅ Banco de dados inicializado com sucesso!"

