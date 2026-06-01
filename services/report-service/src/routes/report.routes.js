import { Router } from 'express';
import * as reportController from '../controllers/report.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { reportAccess } from '../middlewares/role.middleware.js';
import { dateRangeQuerySchema, checkInReportQuerySchema } from '../schemas/report.schema.js';

const router = Router();

router.use(authenticate, reportAccess);

router.get('/occupancy', reportController.occupancyReport);
router.get('/revenue', validate(dateRangeQuerySchema), reportController.revenueReport);
router.get('/reservations', validate(dateRangeQuerySchema), reportController.reservationReport);
router.get('/checkins', validate(checkInReportQuerySchema), reportController.checkInReport);

export default router;
