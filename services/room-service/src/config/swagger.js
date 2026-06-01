import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hotel MIS - Room Service',
      version: '1.0.0',
      description: 'Room inventory and availability',
    },
    servers: [{ url: `http://localhost:${env.port}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Room: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            roomNumber: { type: 'string' },
            roomType: { type: 'string' },
            floor: { type: 'integer' },
            capacity: { type: 'integer' },
            pricePerNight: { type: 'number' },
            status: {
              type: 'string',
              enum: ['AVAILABLE', 'RESERVED', 'OCCUPIED', 'MAINTENANCE'],
            },
          },
        },
      },
    },
  },
  apis: ['./src/swagger/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
