const errorHandlerMiddleware = require('./errorHandler.middleware');
const authMiddleware = require('./auth.middleware');
const checkRoleMiddleware = require('./checkRole.middleware');
const validatorMiddleware = require('./validator.middleware');

module.exports = {
  errorHandlerMiddleware,
  authMiddleware,
  checkRoleMiddleware,
  validatorMiddleware,
};

