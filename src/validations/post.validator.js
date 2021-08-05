const { body, param } = require('express-validator');
const { MAX_LENGTH, POST_TAGS } = require('../constants');
const { checkCommunity } = require('../services/user.service');
const postService = require('../services/post.service');
const { isSuperModerator } = require('../services/user.service');
const { getFirstWords } = require('../helpers/app.helper');


module.exports = {
  forCreate: [
    body('title').notEmpty().withMessage('Title is required!')
      .isString().withMessage('Title must be string!')
      .isLength({ max: MAX_LENGTH.postTitle }).withMessage(`The title must be up to ${ MAX_LENGTH.postTitle } chars`),

    body('body').notEmpty().withMessage('Body of the post is required!')
      .isString().withMessage('Body of the post must be string!'),

    body('summary').optional()
      .isString().withMessage('Summary must be string!'),

    body('community').notEmpty().withMessage('Community of the post is required!')
      .bail()
      .isMongoId().withMessage('It is wrong id format!')
      .bail()
      .custom((value, { req }) => {
        return checkCommunity(req.user._id, value).then(user => {
          if (!user) {
            return Promise.reject('You are not connected the selected community!');
          }
        });
      }),

    body('image').optional()
      .isString().withMessage('Image must be string!')
      .isURL().withMessage('Image must be valid url!'),

    body('tags').default([]).isArray().withMessage('Tags must be an array'),

    body('tags.*').optional()
      .isIn(POST_TAGS).withMessage('It does not match with any tag!')
  ],
  
  sanitizers: [
    body('summary').customSanitizer((value, { req }) => {
      return value || getFirstWords(req.body.body, 100);
    }),
  ],
  
  forById: [
    param('id').notEmpty().withMessage('id is required!')
      .isMongoId().withMessage('It is wrong id format!')
  ],

  hasChangePermission:  async (req, res, next) => {
    try {
      const { user, params } = req;
      if (isSuperModerator(user)) {
        return next();
      }
      const post = await postService.getById(params.id, { author: 1 }).lean();
      if (!post) throw new Error('Post does not exists!');

      if (user._id.toString() !== post.author.toString()) throw new Error('You do not have permission do that!');

      return next();
    } catch (e) {
      res.send({
        errors: [
          { message: e.message }
        ]
      });
    }
  }
};
