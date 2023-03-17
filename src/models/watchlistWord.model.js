const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const watchlistWordSchema = new Schema({ //A list of “problematic” words that should trigger an alert when a user writes 1+ of them in a certain post
  _id: {
    type: ObjectId,
    auto: true
  },
  word: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('WatchlistWord', watchlistWordSchema);
