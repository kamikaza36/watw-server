const logger = require('winston');
const { ErrorHandler } = require('../../middleware/error-handler/error-handling/error-handler');
const userHelper = require('./user-helper');

const getFilteredUser = (email) => {
  return userHelper.getFilteredUserViaEmail(email)
    .then((response) => {
      if (!response) {
        throw new ErrorHandler(409, `User with email ${email} not found.`);
      }
      const user = response._doc;
      return user;
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });
};

const updateUser = (email, updateData) => {
  return userHelper.updateUserViaEmail(email, updateData)
    .then((response) => {
      if (!response) {
        throw new ErrorHandler(409, `User with email ${email} not found.`);
      }
      const user = response._doc;
      return user;
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });
};

const deleteUser = (email) => {
  return userHelper.deleteUserViaEmail(email)
    .then((response) => {
      const success = response.n === 1 ? { statusCode: 200, message: `User with ${email} successfully deleted.` } : false;

      if (!success) {
        throw new ErrorHandler(409, `User with email ${email} not found.`);
      }
      return success;
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });
};

const userServices = {
  getFilteredUser,
  updateUser,
  deleteUser,
};

module.exports = userServices;
