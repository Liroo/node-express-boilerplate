import expressWinston from 'express-winston';
import winston from 'winston';

const basicLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
});

export { basicLogger };
