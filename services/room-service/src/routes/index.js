import { Router } from 'express';
import roomRoutes from './room.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, service: 'room-service', status: 'ok' });
});

router.use('/rooms', roomRoutes);

export default router;
