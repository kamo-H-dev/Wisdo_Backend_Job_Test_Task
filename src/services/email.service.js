const { INFO_EMAIL } = require('../../config/email.config');


class EmailService {
  emailTransport;
  
  constructor() {
    this.emailTransport = { // this is for test 
      sendEmail: async (emailMessage) => {
        return Promise.resolve({ send: true });
      }
    };
  }

  /**
   * 
   * @param to
   * @param subject
   * @param message
   * @return {Promise<unknown>}
   */
  async sendEmail({to, subject, body}) {
    const emailMessage = {
      from: INFO_EMAIL, // Sender address
      to,         //  "user1@mailinator.com, user2@mailinator.com" list of receivers
      subject, // Subject line
    };

    console.log("sendEmail called", { to, subject, body });
    return this.emailTransport.sendEmail(emailMessage);
  }
}

module.exports = new EmailService();
