import { ApiError } from '../utils/ApiError.js';
import { Room } from '../models/Room.js';
import { ROOM_STATUS } from '../constants/roomStatus.js';

const formatRoom = (room) => room.toJSON();

export const createRoom = async (payload) => {
  const existing = await Room.findOne({ roomNumber: payload.roomNumber });
  if (existing) {
    throw new ApiError(409, 'Room number already exists');
  }

  const room = await Room.create(payload);
  return formatRoom(room);
};

export const listRooms = async ({ page, limit, status, roomType, floor, search }) => {
  const filter = {};

  if (status) filter.status = status;
  if (roomType) filter.roomType = roomType;
  if (floor !== undefined) filter.floor = floor;

  if (search) {
    const term = search.trim();
    filter.$or = [
      { roomNumber: { $regex: term, $options: 'i' } },
      { roomType: { $regex: term, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const [rooms, total] = await Promise.all([
    Room.find(filter).sort({ floor: 1, roomNumber: 1 }).skip(skip).limit(limit),
    Room.countDocuments(filter),
  ]);

  return {
    rooms: rooms.map(formatRoom),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

export const getRoomById = async (id) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new ApiError(404, 'Room not found');
  }
  return formatRoom(room);
};

export const updateRoom = async (id, payload) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new ApiError(404, 'Room not found');
  }

  if (payload.roomNumber && payload.roomNumber !== room.roomNumber) {
    const taken = await Room.findOne({ roomNumber: payload.roomNumber, _id: { $ne: id } });
    if (taken) {
      throw new ApiError(409, 'Room number already exists');
    }
  }

  Object.assign(room, payload);
  await room.save();
  return formatRoom(room);
};

export const updateRoomStatus = async (id, status) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new ApiError(404, 'Room not found');
  }

  room.status = status;
  await room.save();
  return formatRoom(room);
};

export const deleteRoom = async (id) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new ApiError(404, 'Room not found');
  }

  if (room.status === ROOM_STATUS.OCCUPIED || room.status === ROOM_STATUS.RESERVED) {
    throw new ApiError(400, 'Cannot delete a reserved or occupied room');
  }

  await room.deleteOne();
  return formatRoom(room);
};

export const isRoomAvailable = async (id) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new ApiError(404, 'Room not found');
  }
  return {
    available: room.status === ROOM_STATUS.AVAILABLE,
    room: formatRoom(room),
  };
};
