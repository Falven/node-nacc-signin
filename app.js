var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var excel = require('exceljs');

var app = module.exports = express();

var index = require('./routes/index');
var admin = require('./routes/admin');

app.locals.title = 'NACC';
app.locals.description = 'NACC Student Login Website.';
app.locals.keywords = 'CSU, NACC, Tutoring, Mentoring';
app.locals.workbookName = 'students.xlsx';
app.locals.workbook = undefined;
app.locals.workbookPath = path.join(__dirname, 'public', 'bin', app.locals.workbookName);
app.locals.worksheetName = 'Students';
app.locals.worksheetColor = '30840F';
app.locals.worksheet = undefined;
app.locals.worksheetColumns = [
  { header: 'Date', key: 'date', width: 12 },
  { header: 'Student ID', key: 'studentID', width: 12 },
  { header: 'Reason for visit', key: 'reason', width: 12 },
  { header: 'Peer Seen', key: 'peer', width: 12 }
];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // 'common'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('pages/error', {
    message: err.message,
    error: {}
  });
});

app.openStudents = function(onOpen) {
  var workbook = app.locals.workbook = new excel.Workbook();
  workbook.xlsx.readFile(app.locals.workbookPath)
    .then(function() {
      // use workbook
      app.locals.worksheet = workbook.getWorksheet(app.locals.worksheetName);
      onOpen();
    }, function() {
      workbook.creator = 'NACC';
      var worksheet = app.locals.worksheet = workbook.addWorksheet(app.locals.worksheetName, app.locals.worksheetColor);
      worksheet.columns = app.locals.worksheetColumns;
      onOpen();
    });
};