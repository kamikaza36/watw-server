const logger = require('winston');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../../middleware/error-handler/error-handling/error-handler');
const userHelper = require('../user/user-helper');

const authSignup = (userData) => {
  const { email } = userData;
  return bcrypt.hash(userData.password, 5)
    .then((hashedPass) => {
      return userHelper.createNewUser(email, hashedPass)
        .then((response) => {
          if (response.code === 11000) {
            const [key, value] = Object.entries(response.keyValue)[0];
            throw new ErrorHandler(409, `User with ${key} ${value} already exists!`);
          }
          const user = response._doc;

          if (user) {
            if (!user.aUserId) {
              logger.error(user.message);
              throw new ErrorHandler(500, 'There was problem with server, try again later.');
            }
            const filteredUser = user;
            delete filteredUser.password;

            const jwtToken = jwt.sign(
              { id: user.id },
              config.get('jwtSecret'),
              { expiresIn: 3600 },
            );

            return { jwtToken, filteredUser };
          }
          throw response;
        })
        .catch((err) => {
          logger.error(err.message);
          throw err;
        });
    });
};

const authLogin = (loginData) => {
  const { email, password } = loginData;

  return userHelper.getUserViaEmail(email)
    .then((response) => {
      if (!response) {
        throw new ErrorHandler(401, 'Wrong email or password.');
      }
      const user = response._doc;
      return bcrypt.compare(password, user.password)
        .then((auth) => {
          if (!auth) {
            throw new ErrorHandler(401, 'Wrong email or password.');
          }
          const filteredUser = user;
          delete filteredUser.password;

          const jwtToken = jwt.sign(
            { id: filteredUser.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
          );

          return { jwtToken, filteredUser };
        });
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });
};

const authServices = {
  authSignup,
  authLogin,
};

module.exports = authServices;
