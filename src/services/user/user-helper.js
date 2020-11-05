const logger = require('winston');
const { ErrorHandler } = require('../../middleware/error-handler/error-handling/error-handler');
const User = require('../../model/user/user-model');
const { defaultUserSettings } = require('../../model/user/user-default-data');

const createNewUser = (userEmail, hashedPass) => {
  return User.create({
    email: userEmail,
    password: hashedPass,
    aUserId: Math.floor(Math.random() * 1000),
    userSettings: defaultUserSettings,
  })
    .then((user) => {
      if (user) {
        return user;
      }
      throw new ErrorHandler(500, `Failed to create new user for data ${userEmail}`);
    })
    .catch((err) => {
      logger.debug(`Error occured while creating user with email ${userEmail}`);
      logger.debug(err.message);
      throw err;
    });
};
const getUserViaEmail = (userEmail) => {
  logger.debug(userEmail);
  return User.findOne({ email: userEmail })
    .then((user) => user)
    .catch((err) => {
      logger.debug(`Error occured while fetching user via email: ${userEmail}`);
      logger.debug(`${err.message}`);
      throw err;
    });
};

const deleteUserViaEmail = (userEmail) => {
  logger.debug(userEmail);
  return User.deleteOne({ email: userEmail })
    .then((user) => user)
    .catch((err) => {
      logger.debug(`Error occured while fetching user via email: ${userEmail}`);
      logger.debug(`${err.message}`);
      throw err;
    });
};

const userHelper = {
  createNewUser,
  getUserViaEmail,
  deleteUserViaEmail,
};

module.exports = userHelper;
