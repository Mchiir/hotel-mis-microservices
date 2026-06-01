/**
 * @openapi
 * /rooms:
 *   get:
 *     tags: [Rooms]
 *     summary: List rooms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [AVAILABLE, RESERVED, OCCUPIED, MAINTENANCE] }
 *       - in: query
 *         name: roomType
 *         schema: { type: string }
 *       - in: query
 *         name: floor
 *         schema: { type: integer }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Paginated room list
 *   post:
 *     tags: [Rooms]
 *     summary: Create room (Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Room created
 *
 * /rooms/{id}:
 *   get:
 *     tags: [Rooms]
 *     summary: Get room by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Room details
 *   put:
 *     tags: [Rooms]
 *     summary: Update room (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Room updated
 *   delete:
 *     tags: [Rooms]
 *     summary: Delete room (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Room deleted
 *
 * /rooms/{id}/availability:
 *   get:
 *     tags: [Rooms]
 *     summary: Check if room is available
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Availability result
 *
 * /rooms/{id}/status:
 *   patch:
 *     tags: [Rooms]
 *     summary: Update room status (Admin, Receptionist)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, RESERVED, OCCUPIED, MAINTENANCE]
 *     responses:
 *       200:
 *         description: Status updated
 */

export {};
