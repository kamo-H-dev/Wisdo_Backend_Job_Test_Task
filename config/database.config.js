require('dotenv').config();

module.exports = {
  host: process.env.MONGO_HOSTNAME,
  port: process.env.MONGO_PORT,
  db: process.env.MONGO_DB,
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
};
