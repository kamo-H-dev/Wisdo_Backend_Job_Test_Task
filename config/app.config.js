require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  BASE_URL: process.env.BASE_URL || 'http://localhost',
  BASE_API_URL: process.env.BASE_API_URL || 'http://localhost:5000/api/v1'
};
