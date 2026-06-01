import * as roomClient from '../clients/room.client.js';
import * as reservationClient from '../clients/reservation.client.js';
import * as paymentClient from '../clients/payment.client.js';

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const countBy = (items, keyFn) => {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
};

export const getOccupancyReport = async (authorization) => {
  const rooms = await roomClient.fetchAllRooms(authorization);
  const totalRooms = rooms.length;

  const byStatus = countBy(rooms, (r) => r.status);
  const occupied = (byStatus.OCCUPIED ?? 0) + (byStatus.RESERVED ?? 0);
  const occupancyRate = totalRooms > 0 ? Number(((occupied / totalRooms) * 100).toFixed(2)) : 0;

  return {
    generatedAt: new Date().toISOString(),
    totalRooms,
    byStatus,
    occupiedRooms: byStatus.OCCUPIED ?? 0,
    reservedRooms: byStatus.RESERVED ?? 0,
    availableRooms: byStatus.AVAILABLE ?? 0,
    maintenanceRooms: byStatus.MAINTENANCE ?? 0,
    occupancyRate,
  };
};

export const getRevenueReport = async (authorization, { from, to } = {}) => {
  const query = {};
  if (from) query.paidFrom = new Date(from).toISOString();
  if (to) query.paidTo = new Date(to).toISOString();

  const payments = await paymentClient.fetchAllPayments(authorization, query);
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const byMethod = countBy(payments, (p) => p.paymentMethod);

  const byMethodTotals = {};
  for (const payment of payments) {
    byMethodTotals[payment.paymentMethod] =
      (byMethodTotals[payment.paymentMethod] ?? 0) + payment.amount;
  }

  return {
    generatedAt: new Date().toISOString(),
    period: { from: from ?? null, to: to ?? null },
    totalPayments: payments.length,
    totalRevenue: Number(totalRevenue.toFixed(2)),
    byMethod: byMethodTotals,
    paymentCountByMethod: byMethod,
    payments,
  };
};

export const getReservationReport = async (authorization, { from, to } = {}) => {
  const query = {};
  if (from) query.checkInFrom = new Date(from).toISOString();
  if (to) query.checkInTo = new Date(to).toISOString();

  const reservations = await reservationClient.fetchAllReservations(authorization, query);
  const byStatus = countBy(reservations, (r) => r.status);

  return {
    generatedAt: new Date().toISOString(),
    period: { from: from ?? null, to: to ?? null },
    totalReservations: reservations.length,
    byStatus,
    reservations,
  };
};

export const getCheckInReport = async (authorization, { date } = {}) => {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  const reservations = await reservationClient.fetchAllReservations(authorization, {
    checkInFrom: dayStart.toISOString(),
    checkInTo: dayEnd.toISOString(),
  });

  const checkInsToday = reservations.filter((r) =>
    ['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT'].includes(r.status),
  );

  const checkedIn = reservations.filter((r) => r.status === 'CHECKED_IN');
  const pendingCheckIn = reservations.filter((r) => r.status === 'CONFIRMED');

  return {
    generatedAt: new Date().toISOString(),
    date: dayStart.toISOString().split('T')[0],
    totalScheduled: reservations.length,
    checkedInCount: checkedIn.length,
    pendingCheckInCount: pendingCheckIn.length,
    checkInsToday,
    checkedIn,
    pendingCheckIn,
  };
};
