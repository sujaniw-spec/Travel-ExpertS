/**
 * Author:Sujani Wijesundera
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/postRegister');
var postContact = require('./routes/postContactus');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//DB Connenction---------------------------------------------------
// Require the mongoose module
var mongoose = require('mongoose');

// Set up a mongoose connection
//Local host 
//var mongoDB = 'mongodb://localhost:27017/travelexperts';
var mongoDB = "mongodb+srv://Sujani:Sujani123@cluster0.4annu.mongodb.net/travelexperts?retryWrites=true&w=majority";

//my connection cluster db
//var mongoDB = "mongodb+srv://Ilup75:Ilup75@cluster0.zigid.mongodb.net/blog?retryWrites=true&w=majority";

//Travelexperts
//var mongoDB = "mongodb+srv://Ilup75:Ilup75@cluster0.zigid.mongodb.net/travelexperts?retryWrites=true&w=majority";

//old way to get connection
//mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//new way from .env
mongoose.connect(process.env.MONGO_URL || mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
  console.log("we're connected!*")
});

//end DB connection-----------------------------------------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/contact', postContact);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
