import { ApiError } from '../utils/ApiError.js';
import { Guest } from '../models/Guest.js';
import { Reservation } from '../models/Reservation.js';
import {
  RESERVATION_STATUS,
  ACTIVE_RESERVATION_STATUSES,
} from '../constants/reservationStatus.js';
import { ROOM_STATUS } from '../constants/roomStatus.js';
import * as roomClient from '../utils/roomClient.js';

const format = (reservation) => reservation.toJSON();

const assertValidDates = (checkInDate, checkOutDate) => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  if (checkOut <= checkIn) {
    throw new ApiError(400, 'Check-out date must be after check-in date');
  }
  return { checkIn, checkOut };
};

const findOverlappingReservation = async (roomId, checkIn, checkOut, excludeId = null) => {
  const filter = {
    roomId,
    status: { $in: ACTIVE_RESERVATION_STATUSES },
    checkInDate: { $lt: checkOut },
    checkOutDate: { $gt: checkIn },
  };
  if (excludeId) filter._id = { $ne: excludeId };

  return Reservation.findOne(filter);
};

const syncRoomForStatus = async (reservation, newStatus, authorization) => {
  const { roomId } = reservation;

  if (newStatus === RESERVATION_STATUS.CONFIRMED) {
    await roomClient.updateRoomStatus(roomId, ROOM_STATUS.RESERVED, authorization);
  } else if (newStatus === RESERVATION_STATUS.CHECKED_IN) {
    await roomClient.updateRoomStatus(roomId, ROOM_STATUS.OCCUPIED, authorization);
  } else if (
    newStatus === RESERVATION_STATUS.CHECKED_OUT ||
    newStatus === RESERVATION_STATUS.CANCELLED
  ) {
    await roomClient.updateRoomStatus(roomId, ROOM_STATUS.AVAILABLE, authorization);
  }
};

export const createReservation = async (payload, authorization) => {
  const guest = await Guest.findById(payload.guestId);
  if (!guest) {
    throw new ApiError(404, 'Guest not found');
  }

  const { checkIn, checkOut } = assertValidDates(payload.checkInDate, payload.checkOutDate);

  const availability = await roomClient.checkRoomAvailability(payload.roomId, authorization);
  if (!availability.available && payload.status !== RESERVATION_STATUS.PENDING) {
    throw new ApiError(400, 'Room is not available');
  }

  const overlap = await findOverlappingReservation(payload.roomId, checkIn, checkOut);
  if (overlap) {
    throw new ApiError(409, 'Room is already reserved for these dates');
  }

  const reservation = await Reservation.create({
    ...payload,
    checkInDate: checkIn,
    checkOutDate: checkOut,
  });

  if (reservation.status === RESERVATION_STATUS.CONFIRMED) {
    await roomClient.updateRoomStatus(payload.roomId, ROOM_STATUS.RESERVED, authorization);
  }

  return format(reservation);
};

export const listReservations = async (query) => {
  const { page, limit, status, guestId, roomId, checkInFrom, checkInTo } = query;
  const filter = {};

  if (status) filter.status = status;
  if (guestId) filter.guestId = guestId;
  if (roomId) filter.roomId = roomId;
  if (checkInFrom || checkInTo) {
    filter.checkInDate = {};
    if (checkInFrom) filter.checkInDate.$gte = new Date(checkInFrom);
    if (checkInTo) filter.checkInDate.$lte = new Date(checkInTo);
  }

  const skip = (page - 1) * limit;
  const [reservations, total] = await Promise.all([
    Reservation.find(filter).sort({ checkInDate: -1 }).skip(skip).limit(limit),
    Reservation.countDocuments(filter),
  ]);

  return {
    reservations: reservations.map(format),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
  };
};

export const getReservationById = async (id) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) {
    throw new ApiError(404, 'Reservation not found');
  }
  return format(reservation);
};

export const updateReservation = async (id, payload, authorization) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) {
    throw new ApiError(404, 'Reservation not found');
  }

  if ([RESERVATION_STATUS.CHECKED_OUT, RESERVATION_STATUS.CANCELLED].includes(reservation.status)) {
    throw new ApiError(400, 'Cannot update a completed or cancelled reservation');
  }

  const previousStatus = reservation.status;
  const previousRoomId = reservation.roomId;

  if (payload.guestId) {
    const guest = await Guest.findById(payload.guestId);
    if (!guest) {
      throw new ApiError(404, 'Guest not found');
    }
    reservation.guestId = payload.guestId;
  }

  const roomId = payload.roomId ?? reservation.roomId;
  const checkInDate = payload.checkInDate ?? reservation.checkInDate;
  const checkOutDate = payload.checkOutDate ?? reservation.checkOutDate;
  const { checkIn, checkOut } = assertValidDates(checkInDate, checkOutDate);

  const overlap = await findOverlappingReservation(roomId, checkIn, checkOut, id);
  if (overlap) {
    throw new ApiError(409, 'Room is already reserved for these dates');
  }

  if (payload.roomId && payload.roomId !== reservation.roomId) {
    const availability = await roomClient.checkRoomAvailability(payload.roomId, authorization);
    if (!availability.available) {
      throw new ApiError(400, 'Room is not available');
    }
  }

  const nextStatus = payload.status ?? reservation.status;
  if (
    nextStatus === RESERVATION_STATUS.CONFIRMED &&
    reservation.status === RESERVATION_STATUS.PENDING
  ) {
    const availability = await roomClient.checkRoomAvailability(roomId, authorization);
    if (!availability.available) {
      throw new ApiError(400, 'Room is not available');
    }
  }

  Object.assign(reservation, {
    ...payload,
    checkInDate: checkIn,
    checkOutDate: checkOut,
  });

  await reservation.save();

  const newStatus = reservation.status;

  if (previousRoomId !== reservation.roomId && previousStatus === RESERVATION_STATUS.CONFIRMED) {
    await roomClient.updateRoomStatus(previousRoomId, ROOM_STATUS.AVAILABLE, authorization);
  }

  if (newStatus !== previousStatus) {
    await syncRoomForStatus(reservation, newStatus, authorization);
  } else if (
    reservation.roomId !== previousRoomId &&
    newStatus === RESERVATION_STATUS.CONFIRMED
  ) {
    await roomClient.updateRoomStatus(reservation.roomId, ROOM_STATUS.RESERVED, authorization);
  }

  return format(reservation);
};

export const deleteReservation = async (id, authorization) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) {
    throw new ApiError(404, 'Reservation not found');
  }

  if (reservation.status === RESERVATION_STATUS.CHECKED_IN) {
    throw new ApiError(400, 'Cannot delete a checked-in reservation. Check out first.');
  }

  const previousStatus = reservation.status;
  reservation.status = RESERVATION_STATUS.CANCELLED;
  await reservation.deleteOne();

  if (
    previousStatus === RESERVATION_STATUS.CONFIRMED ||
    previousStatus === RESERVATION_STATUS.PENDING
  ) {
    try {
      await roomClient.updateRoomStatus(
        reservation.roomId,
        ROOM_STATUS.AVAILABLE,
        authorization,
      );
    } catch {
      // room may already be available
    }
  }

  return format(reservation);
};

export const checkIn = async (id, authorization) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) {
    throw new ApiError(404, 'Reservation not found');
  }

  if (reservation.status !== RESERVATION_STATUS.CONFIRMED) {
    throw new ApiError(400, 'Only confirmed reservations can be checked in');
  }

  reservation.status = RESERVATION_STATUS.CHECKED_IN;
  await reservation.save();
  await roomClient.updateRoomStatus(reservation.roomId, ROOM_STATUS.OCCUPIED, authorization);

  return format(reservation);
};

export const checkOut = async (id, authorization) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) {
    throw new ApiError(404, 'Reservation not found');
  }

  if (reservation.status !== RESERVATION_STATUS.CHECKED_IN) {
    throw new ApiError(400, 'Only checked-in reservations can be checked out');
  }

  reservation.status = RESERVATION_STATUS.CHECKED_OUT;
  await reservation.save();
  await roomClient.updateRoomStatus(reservation.roomId, ROOM_STATUS.AVAILABLE, authorization);

  return format(reservation);
};
