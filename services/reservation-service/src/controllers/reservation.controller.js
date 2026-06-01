import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as reservationService from '../services/reservation.service.js';

const getAuth = (req) => req.headers.authorization;

export const createReservation = asyncHandler(async (req, res) => {
  const reservation = await reservationService.createReservation(req.body, getAuth(req));
  sendSuccess(res, {
    statusCode: 201,
    message: 'Reservation created',
    data: { reservation },
  });
});

export const listReservations = asyncHandler(async (req, res) => {
  const result = await reservationService.listReservations(req.query);
  sendSuccess(res, { message: 'Reservations retrieved', data: result });
});

export const getReservation = asyncHandler(async (req, res) => {
  const reservation = await reservationService.getReservationById(req.params.id);
  sendSuccess(res, { message: 'Reservation retrieved', data: { reservation } });
});

export const updateReservation = asyncHandler(async (req, res) => {
  const reservation = await reservationService.updateReservation(
    req.params.id,
    req.body,
    getAuth(req),
  );
  sendSuccess(res, { message: 'Reservation updated', data: { reservation } });
});

export const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await reservationService.deleteReservation(req.params.id, getAuth(req));
  sendSuccess(res, { message: 'Reservation deleted', data: { reservation } });
});

export const checkIn = asyncHandler(async (req, res) => {
  const reservation = await reservationService.checkIn(req.params.id, getAuth(req));
  sendSuccess(res, { message: 'Check-in successful', data: { reservation } });
});

export const checkOut = asyncHandler(async (req, res) => {
  const reservation = await reservationService.checkOut(req.params.id, getAuth(req));
  sendSuccess(res, { message: 'Check-out successful', data: { reservation } });
});
