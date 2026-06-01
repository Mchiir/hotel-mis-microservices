import { env } from '../config/env.js';
import { fetchAllPages } from '../utils/serviceClient.js';

export const fetchAllRooms = (authorization, query = {}) =>
  fetchAllPages(env.roomServiceUrl, '/rooms', 'rooms', authorization, query);
