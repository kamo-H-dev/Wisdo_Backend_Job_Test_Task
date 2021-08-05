const { validationResult } = require('express-validator');

module.exports = {
  sendErrors: (req, res, next) => {
    try {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.status(400).send(errors);
      }
      
      next();
    } catch (err) {
      res.status(err.status || 400).send({ message: err.message });
    }
  }
};
