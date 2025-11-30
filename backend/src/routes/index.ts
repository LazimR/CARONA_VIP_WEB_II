import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import creditCardRoutes from './creditCard.routes';
import vehicleRoutes from './vehicle.routes';
import routeRoutes from './route.routes';
import tripRoutes from './trip.routes';
import tripPassengerRoutes from './tripPassenger.routes';
import paymentRoutes from './payment.routes';
import paymentModelRoutes from './paymentModel.routes';
import evaluationRoutes from './evaluation.routes';

const router = Router();

// Rotas públicas (sem autenticação)
router.use('/auth', authRoutes);

// Rotas da API (protegidas)
router.use('/users', userRoutes);
router.use('/credit-cards', creditCardRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/routes', routeRoutes);
router.use('/trips', tripRoutes);
router.use('/trip-passengers', tripPassengerRoutes);
router.use('/payments', paymentRoutes); // Mercado Pago
router.use('/payment-models', paymentModelRoutes); // Modelo Payment do banco
router.use('/evaluations', evaluationRoutes);

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Rota de teste da API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API funcionando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get('/test', (req, res) => {
  res.json({
    message: 'API funcionando!',
    timestamp: new Date().toISOString(),
  });
});

export default router;

