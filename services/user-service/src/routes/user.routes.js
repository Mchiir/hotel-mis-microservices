import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/role.middleware.js';
import {
  listUsersQuerySchema,
  updateUserSchema,
  userIdParamSchema,
} from '../schemas/user.schema.js';

const router = Router();

router.use(authenticate, adminOnly);

router.get('/', validate(listUsersQuerySchema, 'query'), userController.listUsers);
router.get('/:id', validate(userIdParamSchema, 'params'), userController.getUser);
router.put(
  '/:id',
  validate(userIdParamSchema, 'params'),
  validate(updateUserSchema),
  userController.updateUser,
);
router.delete('/:id', validate(userIdParamSchema, 'params'), userController.deleteUser);

export default router;
