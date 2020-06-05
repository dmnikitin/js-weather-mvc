const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const logger = require('../common/winston');

const errorMiddleware = (err, req, res, next) => {
  const { code, message } = err;
  if (code) {
    logger.log('error', `error: ${code}: ${message}`);
    res.status(code).send(message);
  } else {
    logger.log(
      'error',
      `error:${INTERNAL_SERVER_ERROR}: INTERNAL_SERVER_ERROR`,
    );
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
};

module.exports = errorMiddleware;
