import { env } from '../config/env.js';
import { fetchAllPages } from '../utils/serviceClient.js';

export const fetchAllPayments = (authorization, query = {}) =>
  fetchAllPages(env.paymentServiceUrl, '/payments', 'payments', authorization, query);
