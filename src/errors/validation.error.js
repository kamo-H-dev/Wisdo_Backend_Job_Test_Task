const BaseError = require('./base.error');

class ValidationError extends BaseError {
  constructor(message = { body: 'Invalid data given!' }) {
    super(400, message);
  }
}

module.exports = ValidationError;
