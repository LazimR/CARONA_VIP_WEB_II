import { Router } from 'express';
import { RouteController } from '../controllers/route.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
const routeController = new RouteController();

/**
 * @swagger
 * /api/routes:
 *   get:
 *     summary: Lista todas as rotas
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: Lista de rotas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 */
router.get('/', asyncHandler(routeController.findAll.bind(routeController)));

/**
 * @swagger
 * /api/routes/user/{createdById}:
 *   get:
 *     summary: Lista rotas criadas por um usuário
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: createdById
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do usuário
 *     responses:
 *       200:
 *         description: Lista de rotas do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 */
router.get('/user/:createdById', asyncHandler(routeController.findByCreatedById.bind(routeController)));

/**
 * @swagger
 * /api/routes/{id}:
 *   get:
 *     summary: Busca rota por ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rota encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: Rota não encontrada
 */
router.get('/:id', asyncHandler(routeController.findById.bind(routeController)));

/**
 * @swagger
 * /api/routes:
 *   post:
 *     summary: Cria uma nova rota
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       201:
 *         description: Rota criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', asyncHandler(routeController.create.bind(routeController)));

/**
 * @swagger
 * /api/routes/{id}:
 *   put:
 *     summary: Atualiza uma rota
 *     tags: [Routes]
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
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       200:
 *         description: Rota atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: Rota não encontrada
 */
router.put('/:id', asyncHandler(routeController.update.bind(routeController)));

/**
 * @swagger
 * /api/routes/{id}:
 *   delete:
 *     summary: Remove uma rota
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Removido com sucesso
 *       404:
 *         description: Rota não encontrada
 */
router.delete('/:id', asyncHandler(routeController.delete.bind(routeController)));

export default router;

