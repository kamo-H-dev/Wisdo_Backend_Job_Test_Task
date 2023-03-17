const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tagSchema = new Schema({
  _id: {
    type: ObjectId,
    auto: true
  },
  title: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Tag', tagSchema);
