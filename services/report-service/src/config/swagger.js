import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hotel MIS - Report Service',
      version: '1.0.0',
      description: 'Aggregated reports from room, reservation, and payment services',
    },
    servers: [{ url: `http://localhost:${env.port}` }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
  },
  apis: ['./src/swagger/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
