// lib/logger.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) =>
      JSON.stringify({ timestamp, level, message }, null, 2)
    )
  ),
  transports: [new winston.transports.File({ filename: 'application.log' })],
});

export default logger;
