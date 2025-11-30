import { Router } from 'express';
import { VehicleController } from '../controllers/vehicle.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
const vehicleController = new VehicleController();

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Lista todos os veículos
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: Lista de veículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */
router.get('/', asyncHandler(vehicleController.findAll.bind(vehicleController)));

/**
 * @swagger
 * /api/vehicles/driver/{driverId}:
 *   get:
 *     summary: Lista veículos de um motorista
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do motorista
 *     responses:
 *       200:
 *         description: Lista de veículos do motorista
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */
router.get('/driver/:driverId', asyncHandler(vehicleController.findByDriverId.bind(vehicleController)));

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Busca veículo por ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Veículo não encontrado
 */
router.get('/:id', asyncHandler(vehicleController.findById.bind(vehicleController)));

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Cria um novo veículo
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: Veículo criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', asyncHandler(vehicleController.create.bind(vehicleController)));

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Atualiza um veículo
 *     tags: [Vehicles]
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
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Veículo atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Veículo não encontrado
 */
router.put('/:id', asyncHandler(vehicleController.update.bind(vehicleController)));

/**
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     summary: Remove um veículo
 *     tags: [Vehicles]
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
 *         description: Veículo não encontrado
 */
router.delete('/:id', asyncHandler(vehicleController.delete.bind(vehicleController)));

export default router;

