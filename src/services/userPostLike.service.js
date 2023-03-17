const UserPostLikeModel = require('../models/userPostLike.model');

module.exports = class UserPostLikeService {

  static find(postId, userId) {
    return UserPostLikeModel.findOne({ postId,  userId }, { _id: 1,  userId: 1, postId: 1 });
  }
  
  static create(postId, userId) {
    const newItem = new UserPostLikeModel({ postId, userId });
    return newItem.save();
  }
};
