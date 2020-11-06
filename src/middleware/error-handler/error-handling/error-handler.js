// const logger = require('winston');

const logger = require('winston');
const mongooseErrorHandlerService = require('../mongoose-error-handler/mongoose-error-handler-service');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err) => {
  logger.error(err.stack);

  const errName = err.name;

  switch (errName) {
    case 'MongoError':
      return mongooseErrorHandlerService(err);

    default:
      return err;
  }
};

module.exports = {
  handleError,
  ErrorHandler,
};
