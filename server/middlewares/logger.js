const logger = require('../common/winston');

const loggerMiddleware = (req, res, next) => {
  logger.log(
    'info',
    `url: ${req.url}, query params: ${JSON.stringify(req.query)},
    body: ${JSON.stringify(req.body)}`,
  );
  next();
};

module.exports = loggerMiddleware;
