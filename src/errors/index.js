const UnauthorizedError = require('./unauthorized.error');
const PermissionDeniedError = require('./permissionDenied.error');
const ValidationError = require('./validation.error');
const NotFoundError = require('./notFound.error');

module.exports = {
  UnauthorizedError,
  PermissionDeniedError,
  ValidationError,
  NotFoundError,
};
