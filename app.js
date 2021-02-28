var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var login=require('./routes/login');
var profile=require('./routes/profile');
var add=require('./routes/add');
var schema=require('./routes/get_schema');
var commit=require('./routes/commit');
var extract_form=require('./routes/form_route');
var save=require('./routes/save.js');
var access=require('./routes/securedform.js');
var security=require('./routes/security.js');
var changesec=require('./routes/changesecurity.js');
var del=require('./routes/delete.js');
var key=require('./routes/generate_key.js');
var access_form=require('./routes/create_access.js');
var read_access=require('./routes/use_access.js');
var query=require('./routes/query.js');
var summary=require('./routes/datasummary.js');
var apiSession=require('./routes/apisession.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(login);
app.use(profile);
app.use(add);
app.use(schema);
app.use(commit);
app.use(extract_form);
app.use(save);
app.use(access);
app.use(security);
app.use(changesec);
app.use(del);
app.use(key);
app.use(access_form);
app.use(read_access);
app.use(query);
app.use(summary);
app.use(apiSession);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
