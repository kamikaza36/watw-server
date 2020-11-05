const logger = require('winston');
const mongoose = require('mongoose');
const { dbUrl, user, pass } = require('./secret');

const dbConnect = () => {
  logger.info('Connecting to database');

  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    user,
    pass,
    useUnifiedTopology: true,
  })
    .catch((err) => {
      logger.error(`Failed to connect to MongoDb. Error:${err}`);
    });
};

module.exports = {
  dbConnect,
};
