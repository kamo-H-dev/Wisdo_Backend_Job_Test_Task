const mongoose = require('mongoose');
const { host, port, db, user, pass } = require('../../config/database.config');

module.exports = class DB {
  static async ConnectDB() {
    const dbURI = `mongodb://${ user }:${ pass }@${ host }:${ port }/${ db }?authSource=admin`;
    console.log('trying to connect to the db ...');
    return await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
};
