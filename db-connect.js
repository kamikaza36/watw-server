const logger = require('winston');
const mongoose = require('mongoose');
const config = require('config');

const dbConnect = () => {
  logger.info('Connecting to database');

  mongoose.connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    user: config.get('mongoUser'),
    pass: config.get('mongoPass'),
    useUnifiedTopology: true,
  })
    .catch((err) => {
      logger.error(`Failed to connect to MongoDb. Error:${err}`);
    });
};

module.exports = {
  dbConnect,
};
