
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { PORT, API_PREFIX } = require('../config/app.config');
const { ConnectDB } = require('./services/dbConnection.service');
const routes = require('./routes');
const { errorHandlerMiddleware, authMiddleware } = require('./middlewares');

ConnectDB().then(() => { // start server listening, once the db successfully connected
  console.log('the db successfully connected!');
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(authMiddleware);
  
  app.use(`${ API_PREFIX }`, routes);
  
  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`app listening at http://localhost: ${ PORT }`)
  });
  
}).catch((error) => {
  console.log("DB connection failed", error);
});



