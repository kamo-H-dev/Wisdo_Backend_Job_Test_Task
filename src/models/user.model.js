const mongoose = require('mongoose');
const { ROLES } = require('../constants');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  _id: {
    type: ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  communities: [ // Number of users who joined this community
    {
      type: ObjectId,
      ref: 'Community',
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
