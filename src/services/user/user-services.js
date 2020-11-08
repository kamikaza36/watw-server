const { diff } = require('deep-diff');
const logger = require('winston');
const { ErrorHandler } = require('../../middleware/error-handler/error-handling/error-handler');
const userHelper = require('./user-helper');

const getFilteredUser = (email) => {
  return userHelper.getFilteredUserViaEmail(email)
    .then((user) => {
      if (!user) {
        throw new ErrorHandler(409, `User with email ${email} not found.`);
      }
      return user;
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });
};

const updateUserData = (email, updateData) => {
  return userHelper.getFilteredUserViaEmail(email)
    .then((filteredUser) => {
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

      return userHelper.updateUserViaEmail(email, validUpdateData)
        .then((success) => {
          if (success === 1) {
            return updateData;
          }
          return new ErrorHandler(500, 'Something went wrong with server. Please try again.');
        });
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });
};

const deleteUser = (email) => {
  return userHelper.deleteUserViaEmail(email)
    .then((response) => {
      if (!response === 1) {
        throw new ErrorHandler(409, `User with email ${email} not found.`);
      }
      const success = response.n === 1 ? { statusCode: 200, message: `User with ${email} successfully deleted.` } : false;
      return success;
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });
};

const userServices = {
  getFilteredUser,
  updateUserData,
  deleteUser,
};

module.exports = userServices;
