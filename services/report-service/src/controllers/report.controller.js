import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as reportService from '../services/report.service.js';

const getAuth = (req) => req.headers.authorization;

export const occupancyReport = asyncHandler(async (req, res) => {
  const report = await reportService.getOccupancyReport(getAuth(req));
  sendSuccess(res, { message: 'Occupancy report generated', data: { report } });
});

export const revenueReport = asyncHandler(async (req, res) => {
  const report = await reportService.getRevenueReport(getAuth(req), req.query);
  sendSuccess(res, { message: 'Revenue report generated', data: { report } });
});

export const reservationReport = asyncHandler(async (req, res) => {
  const report = await reportService.getReservationReport(getAuth(req), req.query);
  sendSuccess(res, { message: 'Reservation report generated', data: { report } });
});

export const checkInReport = asyncHandler(async (req, res) => {
  const report = await reportService.getCheckInReport(getAuth(req), req.query);
  sendSuccess(res, { message: 'Check-in report generated', data: { report } });
});
