const { body, param, query } = require('express-validator');

module.exports.communityId = body('communityId')
  .notEmpty().withMessage('The communityId is required')
  .bail()
  .isMongoId().withMessage('It is wrong id format');


module.exports.paramId = param('id')
  .notEmpty().withMessage('The id is required')
  .bail()
  .isMongoId().withMessage('Id is wrong format');

module.exports.queryUserId = query('userId').optional()
  .isMongoId().withMessage('Id is wrong format');
