const mongoose = require('mongoose');
const { MAX_LENGTH } = require('../constants');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const communitySchema = new Schema({
  _id: {
    type: ObjectId,
    auto: true
  },
  title: {
    type: String,
    required: true,
    maxLength: MAX_LENGTH.communityTitle,
  },
  image: {
    type: String,
    default: '',
  },
  memberCount: { // Number of users who joined this community
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Community', communitySchema);
