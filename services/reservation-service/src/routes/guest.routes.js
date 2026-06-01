import { Router } from 'express';
import * as guestController from '../controllers/guest.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { receptionStaff } from '../middlewares/role.middleware.js';
import {
  createGuestSchema,
  updateGuestSchema,
  listGuestsQuerySchema,
  idParamSchema,
} from '../schemas/guest.schema.js';

const router = Router();

router.use(authenticate, receptionStaff);

router.post('/', validate(createGuestSchema), guestController.createGuest);
router.get('/', validate(listGuestsQuerySchema, 'query'), guestController.listGuests);
router.get('/:id', validate(idParamSchema, 'params'), guestController.getGuest);
router.put(
  '/:id',
  validate(idParamSchema, 'params'),
  validate(updateGuestSchema),
  guestController.updateGuest,
);

export default router;
