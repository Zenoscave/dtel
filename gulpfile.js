'use strict'

var gulp = require('gulp')

var env = process.env.NODE_ENV || 'production'

// read gulp directory contents for the tasks...
require('require-dir')('./gulp')
console.log('Invoking gulp -', env)
gulp.task('default', function () {
  // run with paramater
  gulp.start(env)
})
