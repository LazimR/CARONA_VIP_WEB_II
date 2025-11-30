import { Router } from 'express';
import { TripPassengerController } from '../controllers/tripPassenger.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
const tripPassengerController = new TripPassengerController();

/**
 * @swagger
 * /api/trip-passengers:
 *   get:
 *     summary: Lista todos os passageiros em viagens
 *     tags: [Trip Passengers]
 *     responses:
 *       200:
 *         description: Lista
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TripPassenger'
 */
router.get('/', asyncHandler(tripPassengerController.findAll.bind(tripPassengerController)));

/**
 * @swagger
 * /api/trip-passengers/trip/{tripId}:
 *   get:
 *     summary: Lista passageiros por viagem
 *     tags: [Trip Passengers]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da viagem
 *     responses:
 *       200:
 *         description: Lista de passageiros da viagem
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TripPassenger'
 */
router.get('/trip/:tripId', asyncHandler(tripPassengerController.findByTripId.bind(tripPassengerController)));

/**
 * @swagger
 * /api/trip-passengers/passenger/{passengerId}:
 *   get:
 *     summary: Lista viagens de um passageiro
 *     tags: [Trip Passengers]
 *     parameters:
 *       - in: path
 *         name: passengerId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do passageiro
 *     responses:
 *       200:
 *         description: Lista de viagens do passageiro
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TripPassenger'
 */
router.get('/passenger/:passengerId', asyncHandler(tripPassengerController.findByPassengerId.bind(tripPassengerController)));

/**
 * @swagger
 * /api/trip-passengers/{id}:
 *   get:
 *     summary: Busca registro de passageiro por ID
 *     tags: [Trip Passengers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do registro
 *     responses:
 *       200:
 *         description: Registro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TripPassenger'
 *       404:
 *         description: Registro não encontrado
 */
router.get('/:id', asyncHandler(tripPassengerController.findById.bind(tripPassengerController)));

/**
 * @swagger
 * /api/trip-passengers:
 *   post:
 *     summary: Cria um registro de passageiro em viagem
 *     tags: [Trip Passengers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TripPassenger'
 *     responses:
 *       201:
 *         description: Registro criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TripPassenger'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', asyncHandler(tripPassengerController.create.bind(tripPassengerController)));

/**
 * @swagger
 * /api/trip-passengers/{id}:
 *   put:
 *     summary: Atualiza registro de passageiro em viagem
 *     tags: [Trip Passengers]
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
 *             $ref: '#/components/schemas/TripPassenger'
 *     responses:
 *       200:
 *         description: Registro atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TripPassenger'
 *       404:
 *         description: Registro não encontrado
 */
router.put('/:id', asyncHandler(tripPassengerController.update.bind(tripPassengerController)));

/**
 * @swagger
 * /api/trip-passengers/{id}:
 *   delete:
 *     summary: Remove registro de passageiro
 *     tags: [Trip Passengers]
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
 *         description: Registro não encontrado
 */
router.delete('/:id', asyncHandler(tripPassengerController.delete.bind(tripPassengerController)));

export default router;

