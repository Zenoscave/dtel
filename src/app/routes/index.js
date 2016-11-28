/*jslint node: true, stupid: true */
'use strict';
var fs = require('fs');

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated())
    return next();

  res.redirect('/login');
};

module.exports = function (server, passport) {
  fs.readdirSync('./src/app/routes').forEach(function (file) {
    if (file.substr(-3, 3) === '.js' && file !== 'index.js') {
      require('./' + file)(server, passport, isLoggedIn);
    }
  });
};
