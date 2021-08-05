const express = require('express');

const userController = require('../controllers/user.controller');
const { sendErrors } = require('../middlewares/validator.middleware');
const { individualFieldsValidator } = require('../validations');

const router = express.Router();


// user can join in any community
router.put('/joinToCommunity',
  individualFieldsValidator.communityId,
  sendErrors,
  userController.joinToCommunity
);

module.exports = router;
