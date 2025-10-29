# Carona VIP - Integração Mercado Pago PIX

Este projeto implementa uma integração completa com o Mercado Pago para pagamentos PIX usando o MCP Server.

## 🚀 Configuração Inicial

### 1. Instalar Dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configurar Credenciais do Mercado Pago

1. Acesse [Suas integrações](https://www.mercadopago.com.br/developers/panel/app) no Mercado Pago
2. Crie uma nova aplicação ou use uma existente
3. Copie o **Access Token** (chave privada)
4. Substitua o token no arquivo `backend/src/server.ts` ou configure a variável de ambiente:

```bash
# Criar arquivo .env no diretório backend
echo "MERCADOPAGO_ACCESS_TOKEN=SEU_ACCESS_TOKEN_AQUI" > backend/.env
```

### 3. Configurar MCP Server no Cursor

O arquivo `.cursor/mcp.json` já está configurado. Para usar o MCP Server:

1. Reinicie o Cursor
2. Verifique nas configurações se o MCP Server está ativo
3. Use comandos como: "Busque na documentação do Mercado Pago como integrar o Checkout Pro"

## 🏃‍♂️ Como Executar

### Backend
```bash
cd backend
npm run dev
```

### Frontend
```bash
cd frontend
npm run dev
```

## 📱 Funcionalidades Implementadas

- ✅ Geração de QR Code PIX
- ✅ Código "Copia e Cola" PIX
- ✅ Verificação automática de status do pagamento
- ✅ Interface responsiva
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Integração com MCP Server do Mercado Pago

## 🔧 Endpoints da API

### POST `/create-pix-payment`
Cria um novo pagamento PIX.

**Body:**
```json
{
  "amount": 10.50,
  "description": "Carona VIP",
  "payerEmail": "usuario@email.com",
  "payerCpf": "12345678901"
}
```

**Response:**
```json
{
  "payment_id": "123456789",
  "qr_code_base64": "iVBORw0KGgoAAAANSUhEUgAA...",
  "qr_code_text": "00020126580014br.gov.bcb.pix...",
  "amount": 10.50,
  "expires_in": 30
}
```

### GET `/payment-status/:paymentId`
Verifica o status de um pagamento.

**Response:**
```json
{
  "id": "123456789",
  "status": "approved",
  "status_detail": "accredited",
  "transaction_amount": 10.50,
  "date_approved": "2024-01-15T10:30:00.000-04:00"
}
```

## 🧪 Testando a Integração

1. Acesse `http://localhost:5173/pages/pix.html`
2. Insira um valor (ex: 0.50)
3. Clique em "Gerar QR Code para Pagar"
4. Use o QR Code ou código "Copia e Cola" para pagar
5. O status será atualizado automaticamente

## 🔐 Credenciais de Teste

Para testes, você pode usar:
- **Email:** test_user_123456@testuser.com
- **CPF:** 19119119100
- **Valor:** Qualquer valor acima de R$ 0,01

## 📚 Documentação Adicional

- [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
- [MCP Server Documentation](https://www.mercadopago.com.br/developers/pt/docs/mcp-server/overview)
- [PIX Integration Guide](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/integration-configuration/pix)

## ⚠️ Importante

- Use sempre credenciais de teste em desenvolvimento
- Para produção, configure as credenciais de produção
- O PIX expira em 30 minutos
- Monitore os logs do backend para debug
