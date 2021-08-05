const { communityService, userService } = require('../services');
const { NotFoundError, ValidationError } = require('../errors');


const joinToCommunity = async ({ body, user }, res, next) => {
  console.log('user.controller -> joinToCommunity', body);
  const { communityId } = body;
  try {
    const community = await communityService.getById(communityId, { memberCount: 1 });
    if (!community) throw new NotFoundError('The community does not exists!');
    
    const userData = await userService.getById(user._id, { communities: 1 });
    const alreadyExists = userData.communities.find(id => id.toString() === communityId);
    if (alreadyExists) throw new ValidationError('You already joined the selected community!');

    userData.communities.push(community._id);
    await userData.save();
    
    // update community member count
    community.memberCount++;
    await community.save();

    res.send({ success: true });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  joinToCommunity,
};
