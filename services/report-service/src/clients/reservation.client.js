import { env } from '../config/env.js';
import { fetchAllPages } from '../utils/serviceClient.js';

export const fetchAllReservations = (authorization, query = {}) =>
  fetchAllPages(
    env.reservationServiceUrl,
    '/reservations',
    'reservations',
    authorization,
    query,
  );
