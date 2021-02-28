const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const logger = require('./logger');

/**
 * Error middleware for resource not found
 *
 * @param {Express.Request} _req request object
 * @param {Express.Response} _res response object
 * @param {function} next next function to throw error to proper error middleware
 */
function errorNotFoundMiddleware(_req, _res, next) {
  const err = new Error(ReasonPhrases.NOT_FOUND);
  err.status = StatusCodes.NOT_FOUND;
  next(err);
}

/**
 * Error handling middleware
 *
 * @param {Error} err Errors propagated through middleware
 * @param {Express.Request} _req request object
 * @param {Express.Response} res response object
 * @param {function} next next function
 */
// eslint-disable-next-line no-unused-vars
function errorHandlingMiddleware(err, _req, res, next) {
  let { message } = err;
  let { status } = err;
  logger.error(message);
  if (!status) {
    status = StatusCodes.INTERNAL_SERVER_ERROR;
    message = ReasonPhrases.INTERNAL_SERVER_ERROR;
  }

  res.status(status)
    .json({
      message,
      status,
    });
}

module.exports = {
  errorNotFoundMiddleware,
  errorHandlingMiddleware,
};
