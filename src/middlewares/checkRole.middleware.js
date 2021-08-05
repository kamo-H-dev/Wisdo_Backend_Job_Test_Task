const { UnauthorizedError, PermissionDeniedError } = require('../errors');

module.exports = (role) => {
  return ({ user }, res, next) => {
    try {
      
      if (!user) throw new UnauthorizedError();

      if (!role
        || user.role === role
        || (role instanceof Array && role.indexOf(user.role) > -1)) {

        return next();
      }
  
      throw new PermissionDeniedError();
      
    } catch (err) {
      res.status(err.status || 400).send({ message: err.message });
    }
  };
};
