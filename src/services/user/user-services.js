const { diff } = require('deep-diff');
const logger = require('winston');
const { ErrorHandler } = require('../../middleware/error-handler/error-handling/error-handler');
const userHelper = require('./user-helper');

const getFilteredUser = async (email) => {
  try {
    const filteredUser = await userHelper.getFilteredUserViaEmail(email);
    if (!filteredUser) {
      throw new ErrorHandler(409, `User with email ${email} not found.`);
    }
    return filteredUser;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const updateUserData = async (email, updateData) => {
  try {
    const filteredUser = await userHelper.getFilteredUserViaEmail(email);
    if (!filteredUser) {
      throw new ErrorHandler(409, `User with email ${email} not found.`);
    }
    const validUserObj = JSON.parse(JSON.stringify(filteredUser));
    /*
      Bottleneck for server when updating
      Maybe get ready data straight from frontend
      On frontend get data ready when they change it 1by1 and send it all together
      Shouldn't be too heavy for user
    */
    const newData = diff(validUserObj, updateData);
    if (!newData) {
      throw new ErrorHandler(400, 'No new data to update.');
    }
    const validUpdateData = {};
    newData.forEach((el) => {
      let path = '';
      const value = el.rhs;
      if (!el.path.includes('updatedAt')) {
        el.path.forEach((p) => {
          if (path) {
            path = `${path}.${p}`;
          } else {
            path = p;
          }
        });
        validUpdateData[path] = value;
      }
    });

    if (Object.keys(validUpdateData).length === 0) {
      throw new ErrorHandler(400, 'No new data to update.');
    }

    const success = await userHelper.updateUserViaEmail(email, validUpdateData);
    if (success.nModified === 1) {
      return updateData;
      // if you need to use updatedAt use line below or change updatedAt with cur time on frontend
      // return await userHelper.getFilteredUserViaEmail(email);
    }
    return new ErrorHandler(500, 'Something went wrong with server. Please try again.');
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const deleteUser = async (email) => {
  try {
    const success = await userHelper.deleteUserViaEmail(email);
    if (success.ok !== 1) {
      throw new ErrorHandler(500, 'Something went wrong with server. Please try again.');
    }
    if (success.deletedCount !== 1) {
      throw new ErrorHandler(409, `User with email ${email} not found.`);
    }
    const response = { statusCode: 200, message: `User with ${email} successfully deleted.` };
    return response;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const userServices = {
  getFilteredUser,
  updateUserData,
  deleteUser,
};

module.exports = userServices;
