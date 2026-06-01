import { Router } from 'express';
import * as reservationController from '../controllers/reservation.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { receptionStaff, staffRead } from '../middlewares/role.middleware.js';
import {
  createReservationSchema,
  updateReservationSchema,
  listReservationsQuerySchema,
  reservationIdParamSchema,
} from '../schemas/reservation.schema.js';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  staffRead,
  validate(listReservationsQuerySchema, 'query'),
  reservationController.listReservations,
);
router.post(
  '/',
  receptionStaff,
  validate(createReservationSchema),
  reservationController.createReservation,
);

router.post(
  '/:id/check-in',
  receptionStaff,
  validate(reservationIdParamSchema, 'params'),
  reservationController.checkIn,
);
router.post(
  '/:id/check-out',
  receptionStaff,
  validate(reservationIdParamSchema, 'params'),
  reservationController.checkOut,
);

router.get(
  '/:id',
  staffRead,
  validate(reservationIdParamSchema, 'params'),
  reservationController.getReservation,
);
router.put(
  '/:id',
  receptionStaff,
  validate(reservationIdParamSchema, 'params'),
  validate(updateReservationSchema),
  reservationController.updateReservation,
);
router.delete(
  '/:id',
  receptionStaff,
  validate(reservationIdParamSchema, 'params'),
  reservationController.deleteReservation,
);

export default router;
