const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userPostLikeSchema = new Schema({
  _id: {
    type: ObjectId,
    auto: true
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  }, 
  postId: {
    type: ObjectId,
    ref: 'Post',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('UserPostLike', userPostLikeSchema);
