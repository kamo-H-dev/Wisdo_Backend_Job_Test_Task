const CommunityModel = require('../models/community.model');


module.exports = class CommunityService {

  static getById(id, select = {}) {
    return CommunityModel.findOne({ _id: id }, select);
  }
};
