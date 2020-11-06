const config = require('config');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../error-handler/error-handling/error-handler');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    throw new ErrorHandler(401, 'No token, authorization denied');
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded;
    next();
  } catch (err) {
    throw new ErrorHandler(400, 'Token is not valid');
  }
};

module.exports = auth;
