const express = require('express');
const logger = require('winston');
const { ErrorHandler } = require('../middleware/error-handler/error-handling/error-handler');
const authServices = require('../services/auth/auth-services');

const router = express.Router();

// @route POST api/auth/signup
// @desc User signup
// @access public
router.post('/signup', (req, res, next) => {
  const userData = req.body;

  if (!userData.email || !userData.password) {
    return res.json(new ErrorHandler(400, 'Invalid data. Please use email and password'));
  }
  logger.debug(`Recived signup request from ${userData.email}`);

  return authServices.authSignup(userData)
    .then((userAuth) => res.json(userAuth))
    .catch((err) => {
      logger.error(`Error occured ${err.message}`);
      return next(err);
    });
});

// @route POST api/auth/login
// @desc User login
// @access public
router.post('/login', (req, res, next) => {
  const userData = req.body;

  if (!userData.email || !userData.password) {
    return res.json(new ErrorHandler(400, 'Invalid data. Please use email and password'));
  }
  logger.debug(`Recived login request for ${userData.email}`);

  return authServices.authLogin(userData)
    .then((userAuth) => res.json(userAuth))
    .catch((err) => {
      logger.error(`Error occured ${err.message}`);
      return next(err);
    });
});

module.exports = router;
