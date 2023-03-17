const User = require('../models/user.model');
const { ROLES } = require('../constants');

module.exports = {
  name: 'user',
  /**
   *
   * @param { array } communities inserted community items
   * @return {*}
   */
  run: async (communities) => {
    console.log("communities", communities);
    await User.remove({});
    console.log("User all items removed!");
    
    return User.insertMany([
      {
        name: 'Richard Young',
        email: 'richardyoung@mailinator.com',
        image: 'https://images.unsplash.com/photo-1627994094964-dd7a6a81e11f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
        country: 'United States',
        communities: [communities[0]._id, communities[3]._id] // the hard coded numbers (indexes) can be random
     
      },
      {
        name: 'Thomas Whetzel',
        email: 'thomasmWhetzel@mailinator.com',
        image: 'https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        country: 'United States',
        communities: [communities[1]._id]
     
      },
      {
        name: 'Jessica Ryan',
        email: 'jessicaryan@mailinator.com',
        image: 'https://images.unsplash.com/photo-1500259783852-0ca9ce8a64dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
        country: 'United Kingdom',
        communities: [communities[0]._id, communities[2]._id]
     
      },
      {
        name: 'Diane Solis',
        email: 'dianesolis@mailinator.com',
        image: 'https://images.unsplash.com/photo-1515191107209-c28698631303?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
        country: 'United Kingdom',
        communities: [communities[1]._id, communities[2]._id]

      }, 
      
      //moderators
      {
        name: 'Gregg Noble',
        email: 'greggnoble@mailinator.com',
        role: ROLES.moderator,
        image: 'https://images.unsplash.com/photo-1578916045370-25461e0cf390?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=644&q=80',
        country: 'United States',
        communities: []
      },
      {
        name: 'Amanda Koontz',
        role: ROLES.moderator,
        image: 'https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
        country: 'United States',
        communities: []
      },
      
      //super moderators
      {
        name: 'James Cowan',
        email: 'jamescowan@mailinator.com',
        role: ROLES.superModerator,
        image: 'https://images.unsplash.com/photo-1491609154219-ffd3ffafd992?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        country: 'United States',
        communities: []
      },
      {
        name: 'Grace Goodson',
        role: ROLES.moderator,
        image: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        country: 'United States',
        communities: []
      },
    ])
  },
};
