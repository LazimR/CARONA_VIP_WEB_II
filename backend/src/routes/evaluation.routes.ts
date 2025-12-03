import { Router } from 'express';
import { EvaluationController } from '../controllers/evaluation.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
const evaluationController = new EvaluationController();

/**
 * @swagger
 * /api/evaluations:
 *   get:
 *     summary: Lista todas as avaliações
 *     tags: [Evaluations]
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evaluation'
 */
router.get('/', asyncHandler(evaluationController.findAll.bind(evaluationController)));

/**
 * @swagger
 * /api/evaluations/trip/{tripId}:
 *   get:
 *     summary: Lista avaliações de uma viagem
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da viagem
 *     responses:
 *       200:
 *         description: Lista de avaliações da viagem
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evaluation'
 */
router.get('/trip/:tripId', asyncHandler(evaluationController.findByTripId.bind(evaluationController)));

/**
 * @swagger
 * /api/evaluations/evaluated/{evaluatedId}:
 *   get:
 *     summary: Lista avaliações recebidas
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: evaluatedId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do avaliado
 *     responses:
 *       200:
 *         description: Lista de avaliações recebidas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evaluation'
 */
router.get('/evaluated/:evaluatedId', asyncHandler(evaluationController.findByEvaluatedId.bind(evaluationController)));

/**
 * @swagger
 * /api/evaluations/evaluator/{evaluatorId}:
 *   get:
 *     summary: Lista avaliações dadas
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: evaluatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do avaliador
 *     responses:
 *       200:
 *         description: Lista de avaliações dadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evaluation'
 */
router.get('/evaluator/:evaluatorId', asyncHandler(evaluationController.findByEvaluatorId.bind(evaluationController)));

/**
 * @swagger
 * /api/evaluations/{id}:
 *   get:
 *     summary: Busca avaliação por ID
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evaluation'
 *       404:
 *         description: Avaliação não encontrada
 */
router.get('/:id', asyncHandler(evaluationController.findById.bind(evaluationController)));

/**
 * @swagger
 * /api/evaluations:
 *   post:
 *     summary: Cria uma avaliação
 *     tags: [Evaluations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evaluation'
 *     responses:
 *       201:
 *         description: Avaliação criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evaluation'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', asyncHandler(evaluationController.create.bind(evaluationController)));

/**
 * @swagger
 * /api/evaluations/{id}:
 *   put:
 *     summary: Atualiza uma avaliação
 *     tags: [Evaluations]
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
 *             $ref: '#/components/schemas/Evaluation'
 *     responses:
 *       200:
 *         description: Avaliação atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evaluation'
 *       404:
 *         description: Avaliação não encontrada
 */
router.put('/:id', asyncHandler(evaluationController.update.bind(evaluationController)));

/**
 * @swagger
 * /api/evaluations/{id}:
 *   delete:
 *     summary: Remove uma avaliação
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Avaliação removida com sucesso
 *       404:
 *         description: Avaliação não encontrada
 */
router.delete('/:id', asyncHandler(evaluationController.delete.bind(evaluationController)));

export default router;

