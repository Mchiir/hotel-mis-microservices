import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './database/mongodb.js';
import { logger } from './utils/logger.js';

const start = async () => {
  await connectDatabase();
  app.listen(env.port, () => {
    logger.info(`reservation-service listening on port ${env.port}`);
  });
};

start().catch((err) => {
  logger.error('Failed to start reservation-service', { error: err.message });
  process.exit(1);
});
