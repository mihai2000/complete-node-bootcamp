const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) MIDDLEWARE

app.use(express.json()); //middleware, function that can modify the request data, without it , the data we post is undefined
//express now we are defining a middleware, cause of the next prop added (the third argument)

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('hello form the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES

//mounting the routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;
// 3) SERVER START 

