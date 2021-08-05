const BaseError = require('./base.error');

class PermissionDeniedError extends BaseError {
  constructor(message = 'Permission denied! Please login with the proper role to to that action.') {
    super(403, message);
  }
}

module.exports = PermissionDeniedError;
