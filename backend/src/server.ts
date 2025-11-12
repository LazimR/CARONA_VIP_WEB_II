import 'dotenv/config';
import express from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import cors from 'cors';

const app = express();

// Configuração CORS para permitir requisições do frontend
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true
})); 

app.use(express.json());

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({ 
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-520972345384052-102817-3a8cf488371b370876833fa6850e3c2d-298392239'
});
const paymentClient = new Payment(client);

// Endpoint de teste para verificar se o servidor está funcionando
app.get('/test', (req, res) => {
    res.json({ 
        message: 'Servidor funcionando!', 
        timestamp: new Date().toISOString(),
        mercadopago_configured: !!client.accessToken
    });
});

// Endpoint para testar conectividade com Mercado Pago
app.get('/test-mercadopago', async (req, res) => {
    try {
        // Tenta criar um pagamento mínimo para testar a conectividade
        const testBody = {
            transaction_amount: 0.01,
            description: 'Teste de conectividade',
            payment_method_id: 'pix',
            payer: {
                email: 'test_user_123456@testuser.com'
            }
        };
        
        const payment = await paymentClient.create({ body: testBody });
        
        res.json({
            success: true,
            message: 'Conectividade com Mercado Pago OK',
            payment_id: payment.id,
            status: payment.status
        });
        
    } catch (error) {
        console.error('Erro no teste de conectividade:', error);
        res.status(500).json({
            success: false,
            message: 'Erro na conectividade com Mercado Pago',
            error: error instanceof Error ? error.message : 'Erro desconhecido',
            details: JSON.stringify(error, null, 2)
        });
    }
});

// Endpoint para criar pagamento PIX
app.post('/create-pix-payment', async (req, res) => {
    try {
        const { amount, description, payerEmail, payerCpf } = req.body;

        // Validação dos dados de entrada
        const transactionAmount = amount || 0.50;
        const paymentDescription = description || 'Carona VIP - Pagamento PIX';
        const email = payerEmail || 'andressagomesrp@gmail.com';
        const cpf = payerCpf || '08699071310';


        // Criação do pagamento PIX real
        const body = {
            transaction_amount: transactionAmount,
            description: paymentDescription,
            payment_method_id: 'pix',
            payer: {
                email: email,
                identification: {
                    type: 'CPF',
                    number: cpf
                }
            }
        };

        console.log("Criando pagamento PIX real...", { transactionAmount, paymentDescription });
        
        const payment = await paymentClient.create({ body });
        console.log("Pagamento PIX criado com sucesso! ID:", payment.id);

        // Extração segura dos dados do PIX
        const qr_code_base64 = payment.point_of_interaction?.transaction_data?.qr_code_base64;
        const qr_code_text = payment.point_of_interaction?.transaction_data?.qr_code;
        const paymentId = payment.id;

        if (!qr_code_base64 || !qr_code_text) {
            console.error("Erro: Dados do PIX não encontrados na resposta");
            throw new Error("Não foi possível obter os dados do PIX");
        }

        const pixData = {
            payment_id: paymentId,
            qr_code_base64: qr_code_base64,
            qr_code_text: qr_code_text,
            amount: transactionAmount,
            expires_in: 30
        };

        res.status(201).json(pixData);

    } catch (error) {
        console.error('Erro ao criar pagamento PIX:', error);
        console.error('Tipo do erro:', typeof error);
        console.error('Erro completo:', JSON.stringify(error, null, 2));
        
        let errorMessage = 'Erro desconhecido';
        let errorDetails = 'Detalhes não disponíveis';
        
        if (error instanceof Error) {
            errorMessage = error.message;
            errorDetails = error.stack || 'Stack trace não disponível';
        } else if (typeof error === 'object' && error !== null) {
            errorMessage = (error as any).message || 'Erro de objeto';
            errorDetails = JSON.stringify(error);
        } else {
            errorMessage = String(error);
        }
        
        res.status(500).json({ 
            error: 'Erro ao processar pagamento',
            details: errorMessage,
            debug: errorDetails
        });
    }
});

// Endpoint para verificar status do pagamento
app.get('/payment-status/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params;
        
        const payment = await paymentClient.get({ id: paymentId });
        
        res.json({
            id: payment.id,
            status: payment.status,
            status_detail: payment.status_detail,
            transaction_amount: payment.transaction_amount,
            date_approved: payment.date_approved
        });

    } catch (error) {
        console.error('Erro ao verificar status do pagamento:', error);
        res.status(500).json({ 
            error: 'Erro ao verificar status do pagamento',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
});

// 5. Roda o servidor backend
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});