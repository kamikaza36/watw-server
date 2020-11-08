const logger = require('winston');
const mongoose = require('mongoose');
const config = require('config');

const dbConnect = async () => {
  logger.info('Connecting to database');
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      user: config.get('mongoUser'),
      pass: config.get('mongoPass'),
      useUnifiedTopology: true,
    });
    logger.info('Successfully connected to database!');
  } catch (error) {
    logger.error(`Failed to connect to MongoDb. Error:${error}`);
  }
};

module.exports = {
  dbConnect,
};
