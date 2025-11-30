import { Router } from 'express';
import { PaymentModelController } from '../controllers/paymentModel.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
const paymentModelController = new PaymentModelController();

/**
 * @swagger
 * /api/payment-models:
 *   get:
 *     summary: Lista todos os pagamentos (banco de dados)
 *     tags: [Payment Models]
 *     responses:
 *       200:
 *         description: Lista de pagamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */
router.get('/', asyncHandler(paymentModelController.findAll.bind(paymentModelController)));

/**
 * @swagger
 * /api/payment-models/trip/{tripId}:
 *   get:
 *     summary: Lista pagamentos por viagem
 *     tags: [Payment Models]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da viagem
 *     responses:
 *       200:
 *         description: Lista de pagamentos da viagem
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */
router.get('/trip/:tripId', asyncHandler(paymentModelController.findByTripId.bind(paymentModelController)));

/**
 * @swagger
 * /api/payment-models/payer/{payerId}:
 *   get:
 *     summary: Lista pagamentos de um pagador
 *     tags: [Payment Models]
 *     parameters:
 *       - in: path
 *         name: payerId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do pagador
 *     responses:
 *       200:
 *         description: Lista de pagamentos do pagador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */
router.get('/payer/:payerId', asyncHandler(paymentModelController.findByPayerId.bind(paymentModelController)));

/**
 * @swagger
 * /api/payment-models/status/{status}:
 *   get:
 *     summary: Lista pagamentos por status
 *     tags: [Payment Models]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         description: Status da transação
 *     responses:
 *       200:
 *         description: Lista de pagamentos por status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */
router.get('/status/:status', asyncHandler(paymentModelController.findByStatus.bind(paymentModelController)));

/**
 * @swagger
 * /api/payment-models/{id}:
 *   get:
 *     summary: Busca pagamento pelo ID
 *     tags: [Payment Models]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do pagamento
 *     responses:
 *       200:
 *         description: Pagamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Pagamento não encontrado
 */
router.get('/:id', asyncHandler(paymentModelController.findById.bind(paymentModelController)));

/**
 * @swagger
 * /api/payment-models:
 *   post:
 *     summary: Cria um pagamento
 *     tags: [Payment Models]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Pagamento criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', asyncHandler(paymentModelController.create.bind(paymentModelController)));

/**
 * @swagger
 * /api/payment-models/{id}:
 *   put:
 *     summary: Atualiza um pagamento
 *     tags: [Payment Models]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Pagamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Pagamento não encontrado
 */
router.put('/:id', asyncHandler(paymentModelController.update.bind(paymentModelController)));

/**
 * @swagger
 * /api/payment-models/{id}:
 *   delete:
 *     summary: Remove um pagamento
 *     tags: [Payment Models]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pagamento removido com sucesso
 *       404:
 *         description: Pagamento não encontrado
 */
router.delete('/:id', asyncHandler(paymentModelController.delete.bind(paymentModelController)));

export default router;

