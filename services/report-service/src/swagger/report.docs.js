/**
 * @openapi
 * /reports/occupancy:
 *   get:
 *     tags: [Reports]
 *     summary: Occupancy report (Admin, Accountant)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Room occupancy summary
 *
 * /reports/revenue:
 *   get:
 *     tags: [Reports]
 *     summary: Revenue report
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date-time }
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: Revenue summary
 *
 * /reports/reservations:
 *   get:
 *     tags: [Reports]
 *     summary: Reservation report
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date-time }
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: Reservation summary
 *
 * /reports/checkins:
 *   get:
 *     tags: [Reports]
 *     summary: Check-in report for a date
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Check-in summary
 */

export {};
