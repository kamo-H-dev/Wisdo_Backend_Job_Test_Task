const { EventEmitter } = require('events');
const { onPostCreate } = require('./email.subscription');

class Subscriber {

  subscriber;

  constructor() {
    this.subscriber = new EventEmitter();
    this.init();
  }

  getSubscriber() {
    return this.subscriber;
  }
  
  init() { // init listeners
    onPostCreate.call(this);
  };
}

module.exports = new Subscriber();
