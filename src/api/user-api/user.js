const express = require('express');
const logger = require('winston');

const router = express.Router();
const userServices = require('../../services/user/user-services');

/* Get user */
router.get('', (req, res, next) => {
  const { email } = req.body;

  logger.debug(`Recived get request ${email}`);

  return userServices.getFilteredUser(email)
    .then((user) => res.json(user))
    .catch((err) => {
      logger.error(`Error occured ${err.message}`);
      return next(err);
    });
});

/* Update user */
router.put('', (req, res, next) => {
  const { email } = req.body;

  logger.debug(`Recived put request ${email}`);

  return userServices.getFilteredUser(email)
    .then((filteredUser) => res.json(filteredUser))
    .catch((err) => {
      logger.error(err);
      return next(err);
    });
});

/* Delete user */
router.delete('', (req, res, next) => {
  const { email } = req.body;

  logger.debug(`Recived delete request ${email}`);

  return userServices.deleteUser(email)
    .then((sucess) => res.json(sucess))
    .catch((err) => {
      logger.error(err);
      return next(err);
    });
});

module.exports = router;
