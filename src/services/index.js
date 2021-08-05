const userService = require('./user.service');
const postService = require('./post.service');
const communityService = require('./community.service');
const emailService = require('./email.service');
const userPostLikeService = require('./userPostLike.service');
const watchListService = require('./watchList.service');

module.exports = {
  userService,
  postService,
  communityService,
  emailService,
  userPostLikeService,
  watchListService,
};
