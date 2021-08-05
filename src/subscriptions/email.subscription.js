const { BASE_API_URL } = require('../../config/app.config');

const { getAllModerators, getSuperModerators } = require('../services/user.service');
const emailService = require('../services/email.service');

module.exports.onPostCreate = function() {
  this.subscriber.on('postCreated', async ({ postId, authorName }) => {
    try {
      const emails = await getAllModerators({ email: 1, name: 1 });
      const postLink = `${ BASE_API_URL }/post/${ postId }`;
      const promises = emails.map(({ email, name }) => {
        return emailService.sendEmail({
          to: [email],
          subject: 'A new post was added',
          body: `Hi dear ${ name }, a new post was added by ${ authorName }, please review by this link ${ postLink }`
        });
      });
      await Promise.all(promises);
      console.log('The emails have been sent');
    } catch (e) {
      console.log('onPostCreate -> send emails to moderators/super moderators failed', e);
    }
  }); 
  
  
  this.subscriber.on('watchListWordExists', async ({ postId, authorName, words }) => {
    try {
      const emails = await getSuperModerators({ email: 1, name: 1 });
      const postLink = `${ BASE_API_URL }/post/${ postId }`;
      const promises = emails.map(({ email, name }) => {
        return emailService.sendEmail({
          to: [email],
          subject: 'Post has watch List Words',
          body: `Hi dear ${ name }, the post was added by ${ authorName }, contains these watch list words ${ words.join(',') },  please review by this link ${ postLink }`
        });
      });
      await Promise.all(promises);
      console.log('The emails have been sent');
    } catch (e) {
      console.log('onWatchListWordExists -> send emails to moderators/super moderators failed', e);
    }
  });
};
