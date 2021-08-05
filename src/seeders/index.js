const { ConnectDB } = require('../services/dbConnection.service');

// seed data
const communitySeeder = require('./community.seeder');
const userSeeder = require('./user.seeder');
const watchListWordSeeder = require('./watchListWord.seeder');

class Seeder {
  constructor() {
    //connect mongoose
    ConnectDB()
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      })
      .then(() => {
        console.log('DB connected for seeder');
      });

    this.seeder = [];
    this.prmises = {};
  }

  addSeeder(model, awaitModelName = '') {
    this.seeder.push({ model, awaitModelName });
  }

  run() {
    return this.seeder.map(({ model, awaitModelName }) => {
      if (awaitModelName) {
        return this.prmises[awaitModelName].then((items) => {
          this.prmises[model.name] = model.run(items).then((items) => {
            console.log(`${ model.name } items created successfully!`, items);
            return items;
          }).catch((err) => {
            console.error(`${ model.name } inserting was failed!`, err);
          });
        });
      }
      
      return this.prmises[model.name] = model.run().then((items) => {
        console.log(`${ model.name } items created successfully!`, items);
        return items;
      }).catch((err) => {
        console.error(`${ model.name } inserting was failed!`, err);
      });
    });
  }
}

//run seeder when first time install project SeaLevel -> npm run seed
const startSeeder = new Seeder();
startSeeder.addSeeder(communitySeeder);
startSeeder.addSeeder(userSeeder, 'community');
startSeeder.addSeeder(watchListWordSeeder);
startSeeder.run();
