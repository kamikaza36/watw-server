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
      if (!user) {
        throw new ErrorHandler(500, `Failed to create new user for data ${userEmail}`);
      }
      return user;
    })
    .catch((err) => {
      logger.error(`Error occured while creating user with email ${userEmail}`);
      logger.error(err.message);
      throw err;
    });
};

const getUserViaEmail = (userEmail) => {
  return User.findOne({ email: userEmail })
    .then((user) => {
      if (!user) {
        throw new ErrorHandler(409, `User with email: ${userEmail} not found.`);
      }
      return user;
    })
    .catch((err) => {
      logger.error(`Error occured while fetching user via email: ${userEmail}`);
      logger.error(`${err.message}`);
      throw err;
    });
};

const getFilteredUserViaEmail = (userEmail) => {
  return User.findOne({ email: userEmail })
    .then((user) => {
      if (!user) {
        throw new ErrorHandler(409, `User with email: ${userEmail} not found.`);
      }
      const filteredUser = user;
      delete filteredUser.password;
      return filteredUser;
    })
    .catch((err) => {
      logger.error(`Error occured while fetching user via email: ${userEmail}`);
      logger.error(`${err.message}`);
      throw err;
    });
};

const updateUserViaEmail = (userEmail, updateData) => {
  return User.findOneAndUpdate({ email: userEmail }, updateData)
    .then(((updatedUser) => {
      if (!updatedUser) {
        throw new ErrorHandler(500, `Failed to update new user data for user email: ${userEmail}`);
      }
      const filteredUser = updatedUser;
      delete filteredUser.password;
      return filteredUser;
    }));
};

const deleteUserViaEmail = (userEmail) => {
  return User.deleteOne({ email: userEmail })
    .then((user) => user)
    .catch((err) => {
      logger.error(`Error occured while fetching user via email: ${userEmail}`);
      logger.error(`${err.message}`);
      throw err;
    });
};

const userHelper = {
  createNewUser,
  getUserViaEmail,
  getFilteredUserViaEmail,
  updateUserViaEmail,
  deleteUserViaEmail,
};

module.exports = userHelper;
