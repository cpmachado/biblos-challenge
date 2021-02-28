const {
  createLogger, format, transports,
} = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({
      filename: 'errors.log',
      level: 'error',
    }),
  ],
});

module.exports = logger;
