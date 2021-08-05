const UserModel = require('../models/user.model');
const { ROLES } = require('../constants');


module.exports = class UserService {
  
  static getById(userId, select = {}) {
    return UserModel.findOne({ _id: userId }, select);
  }

  static getRandomUser(role = '') {
    const query = {};
    if (role === ROLES.moderator || role === ROLES.superModerator) {
      query.role = role;
    }
    console.log('query', query);
    return UserModel.findOne(query, { _id: 1, role: 1, name: 1 });
  }
  
  static checkCommunity(userId, communityId) {
    return UserModel.findOne({ _id: userId, communities: communityId }, { communities: 1 });
  }
  
  static getAllModerators(select = {}) {
    return UserModel.find({ role: { $in: [ROLES.moderator, ROLES.superModerator] }, email: { $exists: true } }, select);
  }
  
  
  static getSuperModerators(select = {}) {
    return UserModel.find({ role: { $in: [ROLES.superModerator] }, email: { $exists: true } }, select);
  }

  static isModerator(user) {
    return user.role === ROLES.moderator;
  }  
  
  static isSuperModerator(user) {
    return user.role === ROLES.moderator;
  }
  
};
