const express = require('express');

const postController = require('../controllers/post.controller');
const checkRoleMiddleware = require('../middlewares/checkRole.middleware');
const { sendErrors } = require('../middlewares/validator.middleware');
const { postValidator, individualFieldsValidator } = require('../validations');
const { ROLES } = require('../constants');

const router = express.Router();

// get all recommended posts
router.get('/feed',
  postController.recommendations
);

// get all posts by user id or specific userId
router.get('/', 
  individualFieldsValidator.queryUserId,
  sendErrors,
  postController.all
);

//get by id
router.get('/:id',
  individualFieldsValidator.paramId, 
  sendErrors,
  postController.getById
);

// upload a new post
router.post('/', 
  postValidator.forCreate, 
  sendErrors,
  postValidator.sanitizers,
  postController.create
);

// update a uploaded post by id
router.put('/:id', 
  individualFieldsValidator.paramId, 
  postValidator.forCreate,
  sendErrors,
  postValidator.hasChangePermission,
  postValidator.sanitizers,
  postController.update
);

// like a post or remove like (toggle effect)
router.put('/like/:id',
  individualFieldsValidator.paramId,
  sendErrors,
  postController.addRemoveLike
);


// approve a uploaded post by id
//Moderators + super moderators should be able to approve posts
router.use(checkRoleMiddleware([ROLES.moderator, ROLES.superModerator]));
router.put('/approve/:id',
  individualFieldsValidator.paramId,
  sendErrors,
  postController.approve
);

module.exports = router;
