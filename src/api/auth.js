const express = require('express');
const logger = require('winston');
const { ErrorHandler } = require('../middleware/error-handler/error-handling/error-handler');

const router = express.Router();
const userServices = require('../services/user/user-services');

/* Register user */
router.post('/signup', (req, res, next) => {
  logger.debug('Recived req');
  const userData = req.body;

  if (!userData.email || !userData.password) {
    return res.json(new ErrorHandler(400, 'Invalid data. Please use email and password'));
  }

  return userServices.userSignup(userData)
    .then((userAuth) => res.json(userAuth))
    .catch((err) => {
      logger.error(`Error occured ${err.message}`);
      return next(err);
    });
});

module.exports = router;
