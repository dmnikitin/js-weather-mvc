const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.prettyPrint(),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
    }),
  ],
});

module.exports = logger;
