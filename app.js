const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('winston');
const { handleError } = require('./src/middleware/error-handler/error-handling/error-handler');

const indexRouter = require('./src/api/index');
const userRouter = require('./src/api/user-api/user');
const authRouter = require('./src/api/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsMiddleware = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
};

app.use(corsMiddleware);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/api/auth', authRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  const handledErr = handleError(err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  next();
  // render the error page
  // eslint-disable-next-line prefer-const
  let response = handledErr;
  if (!response.statusCode) {
    response.statusCode = 500;
    response.message = 'Something went wrong with request. Try again.';
  }
  res.status(200).json(response);
});

module.exports = app;
