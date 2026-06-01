import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hotel MIS - Payment Service',
      version: '1.0.0',
      description: 'Payment processing and records',
    },
    servers: [{ url: `http://localhost:${env.port}` }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        Payment: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            reservationId: { type: 'string' },
            amount: { type: 'number' },
            paymentMethod: { type: 'string', enum: ['CASH', 'CARD', 'MOMO'] },
            paidAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./src/swagger/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
