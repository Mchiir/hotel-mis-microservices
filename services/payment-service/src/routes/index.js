import { Router } from 'express';
import paymentRoutes from './payment.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, service: 'payment-service', status: 'ok' });
});

router.use('/payments', paymentRoutes);

export default router;
