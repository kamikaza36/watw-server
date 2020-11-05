const mongooseErrorHandler = (err) => {
  let message = '';
  let statusCode;

  if (err.code === 11000) {
    message = 'is already in use!';
    statusCode = 409;
    const uniqueFields = Object.values(err.keyValue);
    uniqueFields.forEach((element) => {
      message = `${element} ${message}`;
    });
  } else {
    statusCode = 500;
    message = 'Something went wrong with server, please try again later';
  }

  return {
    statusCode,
    message,
  };
};

module.exports = mongooseErrorHandler;
