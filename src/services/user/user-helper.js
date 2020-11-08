const logger = require('winston');
const { ErrorHandler } = require('../../middleware/error-handler/error-handling/error-handler');
const User = require('../../model/user/user-model');
const { defaultUserSettings } = require('../../model/user/user-default-data');

const createNewUser = async (userEmail, hashedPass) => {
  try {
    const user = await User.create({
      email: userEmail,
      password: hashedPass,
      aUserId: Math.floor(Math.random() * 1000),
      userSettings: defaultUserSettings,
    });
    if (!user) {
      throw new ErrorHandler(500, `Failed to create new user for data ${userEmail}`);
    }
    return user;
  } catch (err) {
    logger.error(`Error occured while creating user with email ${userEmail}`);
    logger.error(err.message);
    throw err;
  }
};

const getUserViaEmail = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new ErrorHandler(409, `User with email: ${userEmail} not found.`);
    }
    return user;
  } catch (err) {
    logger.error(`Error occured while fetching user via email: ${userEmail}`);
    logger.error(`${err.message}`);
    throw err;
  }
};

const getFilteredUserViaEmail = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new ErrorHandler(409, `User with email: ${userEmail} not found.`);
    }
    const filteredUser = user;
    delete filteredUser._doc.password;
    return filteredUser._doc;
  } catch (err) {
    logger.error(`Error occured while fetching user via email: ${userEmail}`);
    logger.error(`${err.message}`);
    throw err;
  }
};

const updateUserViaEmail = async (userEmail, updateData) => {
  try {
    const success = await User.updateOne({
      email: userEmail,
    },
    {
      $set: updateData,
    });
    if (!success) {
      throw new ErrorHandler(500, `Failed to update new user data for user email: ${userEmail}`);
    }
    return success;
  } catch (err) {
    logger.error(`Error occured while updating user via email: ${userEmail}`);
    logger.error(`${err.message}`);
    throw err;
  }
};

const deleteUserViaEmail = (userEmail) => {
  return User.deleteOne({ email: userEmail })
    .then((success) => success)
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
