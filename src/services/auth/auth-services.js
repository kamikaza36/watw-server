const logger = require('winston');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../../middleware/error-handler/error-handling/error-handler');
const userHelper = require('../user/user-helper');

const authSignup = async (userData) => {
  try {
    const { email } = userData;
    const hashedPass = await bcrypt.hash(userData.password, 5);
    const dbResponse = await userHelper.createNewUser(email, hashedPass);
    if (dbResponse.code === 11000) {
      const [key, value] = Object.entries(dbResponse.keyValue)[0];
      throw new ErrorHandler(409, `User with ${key} ${value} already exists!`);
    }
    const user = dbResponse._doc;

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
    throw dbResponse;
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
};

const authLogin = async (loginData) => {
  const { email, password } = loginData;

  try {
    const dbResponse = await userHelper.getUserViaEmail(email);
    if (!dbResponse) {
      throw new ErrorHandler(401, 'Wrong email or password.');
    }
    const user = dbResponse._doc;
    const auth = await bcrypt.compare(password, user.password);
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
  } catch (err) {
    logger.error(err);
    throw new ErrorHandler(401, 'Wrong email or password.');
  }
};

const authServices = {
  authSignup,
  authLogin,
};

module.exports = authServices;
