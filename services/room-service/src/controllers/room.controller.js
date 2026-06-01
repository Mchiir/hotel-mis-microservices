import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as roomService from '../services/room.service.js';

export const createRoom = asyncHandler(async (req, res) => {
  const room = await roomService.createRoom(req.body);
  sendSuccess(res, {
    statusCode: 201,
    message: 'Room created',
    data: { room },
  });
});

export const listRooms = asyncHandler(async (req, res) => {
  const result = await roomService.listRooms(req.query);
  sendSuccess(res, {
    message: 'Rooms retrieved',
    data: result,
  });
});

export const getRoom = asyncHandler(async (req, res) => {
  const room = await roomService.getRoomById(req.params.id);
  sendSuccess(res, {
    message: 'Room retrieved',
    data: { room },
  });
});

export const checkAvailability = asyncHandler(async (req, res) => {
  const result = await roomService.isRoomAvailable(req.params.id);
  sendSuccess(res, {
    message: 'Room availability checked',
    data: result,
  });
});

export const updateRoom = asyncHandler(async (req, res) => {
  const room = await roomService.updateRoom(req.params.id, req.body);
  sendSuccess(res, {
    message: 'Room updated',
    data: { room },
  });
});

export const updateRoomStatus = asyncHandler(async (req, res) => {
  const room = await roomService.updateRoomStatus(req.params.id, req.body.status);
  sendSuccess(res, {
    message: 'Room status updated',
    data: { room },
  });
});

export const deleteRoom = asyncHandler(async (req, res) => {
  const room = await roomService.deleteRoom(req.params.id);
  sendSuccess(res, {
    message: 'Room deleted',
    data: { room },
  });
});
