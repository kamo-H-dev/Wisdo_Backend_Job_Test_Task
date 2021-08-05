const BaseError = require('./base.error');

class NotFoundError extends BaseError {
  constructor(message = 'Resource not found!') {
    super(404, message);
  }
}

module.exports = NotFoundError;
