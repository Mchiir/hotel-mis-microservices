import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as guestService from '../services/guest.service.js';

export const createGuest = asyncHandler(async (req, res) => {
  const guest = await guestService.createGuest(req.body);
  sendSuccess(res, { statusCode: 201, message: 'Guest created', data: { guest } });
});

export const listGuests = asyncHandler(async (req, res) => {
  const result = await guestService.listGuests(req.query);
  sendSuccess(res, { message: 'Guests retrieved', data: result });
});

export const getGuest = asyncHandler(async (req, res) => {
  const guest = await guestService.getGuestById(req.params.id);
  sendSuccess(res, { message: 'Guest retrieved', data: { guest } });
});

export const updateGuest = asyncHandler(async (req, res) => {
  const guest = await guestService.updateGuest(req.params.id, req.body);
  sendSuccess(res, { message: 'Guest updated', data: { guest } });
});
