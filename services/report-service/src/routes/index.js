import { Router } from 'express';
import reportRoutes from './report.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, service: 'report-service', status: 'ok' });
});

router.use('/reports', reportRoutes);

export default router;
