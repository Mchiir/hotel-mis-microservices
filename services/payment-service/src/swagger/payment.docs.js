/**
 * @openapi
 * /payments:
 *   post:
 *     tags: [Payments]
 *     summary: Record a payment (Admin, Accountant)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [reservationId, amount, paymentMethod]
 *             properties:
 *               reservationId: { type: string }
 *               amount: { type: number }
 *               paymentMethod: { type: string, enum: [CASH, CARD, MOMO] }
 *               paidAt: { type: string, format: date-time }
 *     responses:
 *       201:
 *         description: Payment created
 *   get:
 *     tags: [Payments]
 *     summary: List payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment list
 *
 * /payments/{id}:
 *   get:
 *     tags: [Payments]
 *     summary: Get payment by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Payment details
 */

export {};
