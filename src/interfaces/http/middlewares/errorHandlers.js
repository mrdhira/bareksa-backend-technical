const Status = require('http-status');

/* istanbul ignore next */
module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { logger } = req.container.cradle;
  logger.error(err);

  const response = Object.assign({
    type: 'InternalServerError'
  }, config.env === 'development' && {
    message: err.message,
    stack: err.stack
  });

  res.status(Status.INTERNAL_SERVER_ERROR).json(response);
};
