const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//routes
const index = require('./routes/index');
const resource = require('./routes/resource');

app.use('/', index);
app.use('/:id', resource);

//mongodb
const mongodb = require('mongodb')
MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://matand:alliance@ds031741.mlab.com:31741/af', function (err, db) {
  if (err) throw err
  console.log("Yay connected")
  db.collection('archives').find({year: "1908"},{_id: 0, item:1, year: 1, nature:1, content:1}).toArray( (err, docs) => {
    console.log(docs)
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
