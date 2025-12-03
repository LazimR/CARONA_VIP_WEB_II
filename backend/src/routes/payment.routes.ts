import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
const paymentController = new PaymentController();

/**
 * @swagger
 * /api/payments/create-pix-payment:
 *   post:
 *     summary: Cria um pagamento PIX com Mercado Pago
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Valor do pagamento
 *               description:
 *                 type: string
 *                 description: Descrição do pagamento
 *               payerEmail:
 *                 type: string
 *                 format: email
 *               payerCpf:
 *                 type: string
 *                 description: CPF do pagador
 *     responses:
 *       201:
 *         description: Pagamento PIX criado, retorna QRCode e dados
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no processamento pix
 */
router.post('/create-pix-payment', asyncHandler(paymentController.createPixPayment.bind(paymentController)));

/**
 * @swagger
 * /api/payments/payment-status/{paymentId}:
 *   get:
 *     summary: Consulta status de um pagamento do Mercado Pago
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pagamento gerado pelo Mercado Pago
 *     responses:
 *       200:
 *         description: Status do pagamento retornado
 *       404:
 *         description: Pagamento não encontrado
 */
router.get('/payment-status/:paymentId', asyncHandler(paymentController.getPaymentStatus.bind(paymentController)));

/**
 * @swagger
 * /api/payments/test-mercadopago:
 *   get:
 *     summary: Testa conectividade Mercado Pago
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Teste de conexão ok
 *       500:
 *         description: Erro ao conectar
 */
router.get('/test-mercadopago', asyncHandler(paymentController.testMercadoPago.bind(paymentController)));

export default router;

