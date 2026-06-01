import dotenv from 'dotenv';

dotenv.config();

const required = [
  'JWT_ACCESS_SECRET',
  'ROOM_SERVICE_URL',
  'RESERVATION_SERVICE_URL',
  'PAYMENT_SERVICE_URL',
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const stripSlash = (url) => url.replace(/\/$/, '');

export const env = {
  port: Number(process.env.PORT) || 3006,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  roomServiceUrl: stripSlash(process.env.ROOM_SERVICE_URL),
  reservationServiceUrl: stripSlash(process.env.RESERVATION_SERVICE_URL),
  paymentServiceUrl: stripSlash(process.env.PAYMENT_SERVICE_URL),
};
