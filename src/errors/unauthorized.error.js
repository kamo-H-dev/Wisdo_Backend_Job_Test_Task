const BaseError = require('./base.error');

class UnauthorizedError extends BaseError {
  constructor(message = 'Please sign in to access the resource') {
    super(401, message);
  }
}

module.exports = UnauthorizedError;
