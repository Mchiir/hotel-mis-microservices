import app from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

app.listen(env.port, () => {
  logger.info(`report-service listening on port ${env.port}`);
});
