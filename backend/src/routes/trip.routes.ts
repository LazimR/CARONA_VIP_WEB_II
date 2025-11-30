import { Router } from 'express';
import { TripController } from '../controllers/trip.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
const tripController = new TripController();

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Lista todas as viagens
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: Lista de viagens retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 */
router.get('/', asyncHandler(tripController.findAll.bind(tripController)));

/**
 * @swagger
 * /api/trips/driver/{driverId}:
 *   get:
 *     summary: Busca viagens de um motorista
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de viagens do motorista
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 */
router.get('/driver/:driverId', asyncHandler(tripController.findByDriverId.bind(tripController)));

/**
 * @swagger
 * /api/trips/status/{status}:
 *   get:
 *     summary: Busca viagens por status
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [OPEN, IN_PROGRESS, FINISHED, CANCELED]
 *     responses:
 *       200:
 *         description: Lista de viagens com o status especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 */
router.get('/status/:status', asyncHandler(tripController.findByStatus.bind(tripController)));

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Busca uma viagem por ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Viagem encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:id', asyncHandler(tripController.findById.bind(tripController)));

/**
 * @swagger
 * /api/trips:
 *   post:
 *     summary: Cria uma nova viagem
 *     tags: [Trips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       201:
 *         description: Viagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post('/', asyncHandler(tripController.create.bind(tripController)));

/**
 * @swagger
 * /api/trips/{id}:
 *   put:
 *     summary: Atualiza uma viagem
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driverId:
 *                 type: string
 *                 format: uuid
 *               routeId:
 *                 type: string
 *                 format: uuid
 *               departureAt:
 *                 type: string
 *                 format: date-time
 *               totalSeats:
 *                 type: integer
 *               availableSeats:
 *                 type: integer
 *               pricePerPerson:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *                 enum: [OPEN, IN_PROGRESS, FINISHED, CANCELED]
 *     responses:
 *       200:
 *         description: Viagem atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put('/:id', asyncHandler(tripController.update.bind(tripController)));

/**
 * @swagger
 * /api/trips/{id}:
 *   delete:
 *     summary: Remove uma viagem
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Viagem removida com sucesso
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete('/:id', asyncHandler(tripController.delete.bind(tripController)));

export default router;

