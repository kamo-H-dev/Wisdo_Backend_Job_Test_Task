const Community = require('../models/community.model');

module.exports = {
  name: 'community',
  run: async () => {
    await Community.remove({});
    console.log("Community all items removed!");
    
    return Community.insertMany([
      {
        title: 'Walking Together',
        memberCount: 2,
        image: 'https://images.unsplash.com/photo-1540927069569-7ee97bd16165?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      },
      {
        title: 'Team Togetherness',
        memberCount: 2,
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      },
      {
        title: 'Living in Harmony',
        memberCount: 2,
        image: 'https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },
      {
        title: 'Sports car',
        memberCount: 1,
        image: 'https://images.unsplash.com/photo-1531921391719-ca49c9b4c810?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      },
    ])
  },
};
