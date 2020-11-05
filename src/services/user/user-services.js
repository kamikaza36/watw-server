const logger = require('winston');
const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../../middleware/error-handler/error-handling/error-handler');
const userHelper = require('./user-helper');

const userSignup = (userData) => {
  const { email } = userData;
  return bcrypt.hash(userData.password, 5)
    .then((hashedPass) => userHelper.createNewUser(email, hashedPass)
      .then((response) => {
        const user = response._doc;

        if (user) {
          if (!user.aUserId) {
            logger.error(user.message);
            throw new ErrorHandler(500, 'There was problem with server, try again later.');
          }
          return user;
        }
        if (response.code === 11000) {
          const [key, value] = Object.entries(response.keyValue)[0];
          throw new ErrorHandler(409, `User with ${key} ${value} already exists!`);
        }
        throw response;
      })
      .catch((err) => {
        logger.error(err.message);
        throw err;
      }));
};

const getUser = (email) => {
  return userHelper.getUserViaEmail(email)
    .then((response) => {
      if (!response) {
        throw new ErrorHandler(409, `User with email ${email} not found.`);
      }

      const filteredUser = response._doc;

      return filteredUser;
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
  userSignup,
  getUser,
  deleteUser,
};

module.exports = userServices;
