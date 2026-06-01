import { Router } from 'express';
import * as paymentController from '../controllers/payment.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { financeStaff } from '../middlewares/role.middleware.js';
import {
  createPaymentSchema,
  listPaymentsQuerySchema,
  paymentIdParamSchema,
} from '../schemas/payment.schema.js';

const router = Router();

router.use(authenticate, financeStaff);

router.post('/', validate(createPaymentSchema), paymentController.createPayment);
router.get('/', validate(listPaymentsQuerySchema, 'query'), paymentController.listPayments);
router.get('/:id', validate(paymentIdParamSchema, 'params'), paymentController.getPayment);

export default router;
