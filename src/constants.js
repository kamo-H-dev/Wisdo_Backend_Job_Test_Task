// START validation
// for posts
module.exports.MAX_LENGTH = {
  postTitle: 60,
  communityTitle: 60,
};
module.exports.POST_STATUSES = {
  pendingApproval: 'pending_approval',
  approved: 'approved',
};

module.exports.POST_TAGS = [
  'sport',
  'family',
  'friends',
  'movies',
  'pets'
];

module.exports.ROLES = {
  moderator: 'moderator',
  superModerator: 'superModerator',
};

module.exports.LOGGED_USER = 'loggedUser';


// END validation 
