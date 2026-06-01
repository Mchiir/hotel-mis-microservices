import { Router } from 'express';
import * as roomController from '../controllers/room.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { adminOnly, staffRead, staffWrite } from '../middlewares/role.middleware.js';
import {
  createRoomSchema,
  updateRoomSchema,
  updateStatusSchema,
  listRoomsQuerySchema,
  roomIdParamSchema,
} from '../schemas/room.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', staffRead, validate(listRoomsQuerySchema, 'query'), roomController.listRooms);
router.post('/', adminOnly, validate(createRoomSchema), roomController.createRoom);

router.get(
  '/:id/availability',
  staffRead,
  validate(roomIdParamSchema, 'params'),
  roomController.checkAvailability,
);

router.patch(
  '/:id/status',
  staffWrite,
  validate(roomIdParamSchema, 'params'),
  validate(updateStatusSchema),
  roomController.updateRoomStatus,
);

router.get('/:id', staffRead, validate(roomIdParamSchema, 'params'), roomController.getRoom);
router.put(
  '/:id',
  adminOnly,
  validate(roomIdParamSchema, 'params'),
  validate(updateRoomSchema),
  roomController.updateRoom,
);
router.delete(
  '/:id',
  adminOnly,
  validate(roomIdParamSchema, 'params'),
  roomController.deleteRoom,
);

export default router;
