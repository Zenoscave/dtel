var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bunyan = require('bunyan');
var mongoose = require('mongoose');
var routes = require('./src/app/routes/index');
var passport = require('passport');
var strategies = require('./common/passport');
var flash    = require('connect-flash');
var session      = require('express-session');

module.exports = function () {
  var app = express();


  // view engine setup
  app.set('views', path.join(__dirname, 'src/views'));
  app.set('view engine', 'ejs');

  // passport authentication setup
  app.use(session({ 
    secret: require('./common/secret')(Date.now()), // session secret
    resave: true,
    saveUninitialized: true
  })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session


  log = bunyan.createLogger({
    name: 'skeleton',
    level: process.env.LOG_LEVEL || 'info',
    stream: process.stdout,
    serializers: bunyan.stdSerializers
  })

  strategies(passport, log);

  // Middleware setup
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // Routes setup
  routes(app, passport);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  
 
  // Default error handler. Personalize according to your needs.
  app.on('uncaughtException', function (req, res, route, err) {
    log.error('******* Begin Error *******')
    log.error(route)
    log.error('*******')
    log.error(err.stack)
    log.error('******* End Error *******')
    if (!res.headersSent) {
      return res.send(500, {ok: false})
    }
    res.write('\n')
    res.end()
  })

  
  mongoose.connect(process.env.MONGODB_URI, function (err) {
    if (err) {
      log.error('Cannot connect to ' + process.env.MONGODB_URI)
      throw err
    }
    log.info('Connected to ' + process.env.MONGODB_URI)
  })

  process.on('SIGINT', function () {
    mongoose.disconnect(function () {
      log.info('Connection to ' + process.env.MONGODB_URI + ' closed')
    })
    app.close(function () {
      log.info('Server Closed')
    })
  })

  return app.listen(8080, function () {
    log.info('Server Started on port 8080')
  })
}