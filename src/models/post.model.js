const mongoose = require('mongoose');
const { MAX_LENGTH, POST_STATUSES, POST_TAGS } = require('../constants');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema({
  _id: {
    type: ObjectId,
    auto: true
  },
  title: {
    type: String,
    required: true,
    maxLength: MAX_LENGTH.postTitle,
  },
  summary: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: { // the author of this post (user which upload this post)
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  community: {
    type: ObjectId,
    ref: 'Community',
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  tags: [
    { 
      type: String,
      enum: POST_TAGS
    }
  ],
  likes: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: [POST_STATUSES.pendingApproval, POST_STATUSES.approved],
    default: POST_STATUSES.pendingApproval,
  },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
