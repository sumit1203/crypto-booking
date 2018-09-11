const winston = require('winston');

if (!process.env.NODE_ENV) {
  throw new Error('Must set NODE_ENV');
}

module.exports = Object.assign(
  {
    logger: winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    }),
  },
  require(`./${process.env.NODE_ENV}`)
);
