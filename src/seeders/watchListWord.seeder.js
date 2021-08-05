const WatchListWordModel = require('../models/watchlistWord.model');

module.exports = {
  name: 'watchListWord',
  run: async () => {
    await WatchListWordModel.remove({});
    console.log("watchListWord all items removed!");
    
    return WatchListWordModel.insertMany([
      {
        word: 'test',
      },
      {
        word: 'bad',
      },
      {
        word: 'kill',
      },
      {
        word: 'ddd',
      }, 
      
    ])
  },
};
