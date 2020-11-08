const express = require('express');
const logger = require('winston');
const { ErrorHandler } = require('../middleware/error-handler/error-handling/error-handler');
const authServices = require('../services/auth/auth-services');

const router = express.Router();

// @route POST api/auth/register
// @desc User register
// @access public
router.post('/register', async (req, res, next) => {
  logger.debug('here');
  const userData = req.body;

  if (!userData.email || !userData.password) {
    return res.json(new ErrorHandler(400, 'Invalid data. Please use email and password'));
  }
  logger.debug(`Recived register request from ${userData.email}`);
  try {
    const userAuth = await authServices.authSignup(userData);
    logger.info(`Registration for ${userData.email} was successful`);
    return res.json(userAuth);
  } catch (err) {
    logger.error(`Error occured ${err.message}`);
    return next(err);
  }
});

// @route POST api/auth/login
// @desc User login
// @access public
router.post('/login', async (req, res, next) => {
  const userData = req.body;

  if (!userData.email || !userData.password) {
    return res.json(new ErrorHandler(400, 'Invalid data. Please use email and password'));
  }
  try {
    logger.debug(`Recived login request for ${userData.email}`);
    const userAuth = await authServices.authLogin(userData);
    return res.json(userAuth);
  } catch (err) {
    logger.error(`Error occured ${err.message}`);
    return next(err);
  }
});

module.exports = router;
