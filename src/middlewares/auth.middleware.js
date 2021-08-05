//dummy middleware/function that allows fetching a dummy userId for authorization
const { getRandomUser } = require('../services/user.service');
module.exports = async (req, res, next) => {
  const user = await getRandomUser(req.headers['role-type']).lean();
  if (user) {
    req.user = user;
  }
  next();
};
