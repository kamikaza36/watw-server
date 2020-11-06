const express = require('express');
const logger = require('winston');
const auth = require('../../middleware/user-auth/user-auth');

const router = express.Router();
const userServices = require('../../services/user/user-services');

/* Get user */
router.get('', auth, (req, res, next) => {
  const { email } = req.body;

  logger.debug(`Recived get user request for ${email}`);

  return userServices.getFilteredUser(email)
    .then((user) => res.json(user))
    .catch((err) => {
      logger.error(`Error occured ${err.message}`);
      return next(err);
    });
});

/* Update user */
router.put('', auth, (req, res, next) => {
  const { email } = req.body;

  logger.debug(`Recived update user request for ${email}`);

  return userServices.getFilteredUser(email)
    .then((filteredUser) => res.json(filteredUser))
    .catch((err) => {
      logger.error(err);
      return next(err);
    });
});

/* Delete user */
router.delete('', auth, (req, res, next) => {
  const { email } = req.body;

  logger.debug(`Recived delete user request for ${email}`);

  return userServices.deleteUser(email)
    .then((sucess) => res.json(sucess))
    .catch((err) => {
      logger.error(err);
      return next(err);
    });
});

module.exports = router;
