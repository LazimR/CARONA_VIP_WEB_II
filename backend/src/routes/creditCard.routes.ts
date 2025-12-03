import { Router } from 'express';
import { CreditCardController } from '../controllers/creditCard.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
const creditCardController = new CreditCardController();

/**
 * @swagger
 * /api/credit-cards:
 *   get:
 *     summary: Lista todos os cartões de crédito
 *     tags: [Credit Cards]
 *     responses:
 *       200:
 *         description: Lista de cartões retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreditCard'
 */
router.get('/', asyncHandler(creditCardController.findAll.bind(creditCardController)));

/**
 * @swagger
 * /api/credit-cards/user/{userId}:
 *   get:
 *     summary: Lista cartões de crédito de um usuário
 *     tags: [Credit Cards]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do usuário
 *     responses:
 *       200:
 *         description: Lista de cartões do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreditCard'
 */
router.get('/user/:userId', asyncHandler(creditCardController.findByUserId.bind(creditCardController)));

/**
 * @swagger
 * /api/credit-cards/{id}:
 *   get:
 *     summary: Busca cartão de crédito por ID
 *     tags: [Credit Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do cartão
 *     responses:
 *       200:
 *         description: Cartão encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreditCard'
 *       404:
 *         description: Cartão não encontrado
 */
router.get('/:id', asyncHandler(creditCardController.findById.bind(creditCardController)));

/**
 * @swagger
 * /api/credit-cards:
 *   post:
 *     summary: Cria um novo cartão de crédito
 *     tags: [Credit Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreditCard'
 *     responses:
 *       201:
 *         description: Cartão criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreditCard'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', asyncHandler(creditCardController.create.bind(creditCardController)));

/**
 * @swagger
 * /api/credit-cards/{id}:
 *   put:
 *     summary: Atualiza dados de um cartão de crédito
 *     tags: [Credit Cards]
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
 *             $ref: '#/components/schemas/CreditCard'
 *     responses:
 *       200:
 *         description: Cartão atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreditCard'
 *       404:
 *         description: Cartão não encontrado
 */
router.put('/:id', asyncHandler(creditCardController.update.bind(creditCardController)));

/**
 * @swagger
 * /api/credit-cards/{id}:
 *   delete:
 *     summary: Remove um cartão de crédito
 *     tags: [Credit Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cartão removido com sucesso
 *       404:
 *         description: Cartão não encontrado
 */
router.delete('/:id', asyncHandler(creditCardController.delete.bind(creditCardController)));

export default router;

