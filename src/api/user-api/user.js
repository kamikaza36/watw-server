const express = require('express');
const logger = require('winston');

const router = express.Router();
const userServices = require('../../services/user/user-services');

/* Get user */
router.get('/:email', (req, res, next) => {
  const { email } = req.params;

  logger.debug(`Recived get request ${req.params.email}`);

  return userServices.getUser(email)
    .then((filteredUser) => res.json(filteredUser))
    .catch((err) => {
      logger.error(`Error occured ${err.message}`);
      return next(err);
    });
});

/* Update user */
router.put('/:email', (req, res, next) => {
  const { email } = req.params;

  logger.debug(`Recived put request ${req.params.email}`);

  return userServices.getUserViaEmail(email)
    .then((filteredUser) => res.json(filteredUser))
    .catch((err) => {
      logger.error(err);
      return next(err);
    });
});

/* Delete user */
router.delete('/:email', (req, res, next) => {
  const { email } = req.params;

  logger.debug(`Recived delete request ${req.params.email}`);

  return userServices.deleteUser(email)
    .then((sucess) => res.json(sucess))
    .catch((err) => {
      logger.error(err);
      return next(err);
    });
});

module.exports = router;
