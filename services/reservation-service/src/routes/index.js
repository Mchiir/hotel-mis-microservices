import { Router } from 'express';
import guestRoutes from './guest.routes.js';
import reservationRoutes from './reservation.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, service: 'reservation-service', status: 'ok' });
});

router.use('/guests', guestRoutes);
router.use('/reservations', reservationRoutes);

export default router;
