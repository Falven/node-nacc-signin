var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');

var app = module.exports = express();

var index = require('./controllers/index');
var admin = require('./controllers/admin');

app.locals.title = 'NACC';

app.locals.studentsPath = path.join(__dirname, 'public', 'csv', 'students.csv');
app.locals.studentsColumns = [
  'Date',
  'CSUID',
  'Reason for visit',
  'Peer Seen'
];

app.locals.tutorsPath = path.join(__dirname, 'public', 'csv', 'tutors.csv');
app.locals.tutorsColumns = [
  'Tutor',
  'Description'
];

app.locals.mentorsPath = path.join(__dirname, 'public', 'csv', 'mentors.csv');
app.locals.mentorsColumns = [
  'Mentor',
  'Description'
];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // 'common'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));
app.use(session({
  secret: 'nacc',
  resave: false,
  saveUninitialized: false,
  unset: 'destroy'
}));

app.use('/', index);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('pages/error', {
    message: err.message,
    error: {}
  });
});

init();

function init() {
  try {
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    converter.fromFile(app.locals.studentsPath, function(err, result) {
      app.locals.students = result
      if(app.locals.students && app.locals.students.length > 0) {
        app.locals.studentsColumns = Object.keys(app.locals.students[0]);
      }
    });
    converter = new Converter({});
    converter.fromFile(app.locals.tutorsPath, function(err, result) {
      app.locals.tutors = result
      if(app.locals.tutors && app.locals.tutors.length > 0) {
        app.locals.tutorsColumns = Object.keys(app.locals.tutors[0]);
      }
    });
    converter = new Converter({});
    converter.fromFile(app.locals.mentorsPath, function(err, result) {
      app.locals.mentors = result
      if(app.locals.mentors && app.locals.mentors.length > 0) {
        app.locals.mentorsColumns = Object.keys(app.locals.mentors[0]);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

app.getDate = function () {
  var date = new Date();
  var dd = date.getDate().toString();
  var mm = date.getMonth() + 1; // jan = 0
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return yyyy + '/' + mm + '/' + dd + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};