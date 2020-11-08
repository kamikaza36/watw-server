const express = require('express');
const logger = require('winston');
const { ErrorHandler } = require('../../middleware/error-handler/error-handling/error-handler');
const auth = require('../../middleware/user-auth/user-auth');

const router = express.Router();
const userServices = require('../../services/user/user-services');

/* Get user */
router.get('', auth, async (req, res, next) => {
  const { email } = req.body;

  logger.debug(`Recived get user request for ${email}`);
  try {
    const filteredUser = await userServices.getFilteredUser(email);
    return res.json(filteredUser);
  } catch (err) {
    logger.error(`Error occured ${err.message}`);
    return next(err);
  }
});

/* Update user */
router.put('', auth, async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw new ErrorHandler(500, 'Email not present in request!');
  }
  logger.debug(`Recived update user request for ${email}`);
  try {
    const filteredUser = await userServices.updateUserData(email, req.body);
    return res.json(filteredUser);
  } catch (err) {
    logger.error(err);
    return next(err);
  }
});

/* Delete user */
router.delete('', auth, async (req, res, next) => {
  const { email } = req.body;

  logger.debug(`Recived delete user request for ${email}`);
  try {
    const success = await userServices.deleteUser(email);
    return res.json(success);
  } catch (err) {
    logger.error(err);
    return next(err);
  }
});

module.exports = router;
