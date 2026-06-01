import { Router } from 'express';
import userRoutes from './user.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, service: 'user-service', status: 'ok' });
});

router.use('/users', userRoutes);

export default router;
