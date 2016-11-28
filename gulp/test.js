'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');

var plugins = gulpLoadPlugins();

gulp.task('env:test', function () {
  process.env.NODE_ENV = 'test';
  process.env.MONGODB_URI = 'mongodb://localhost:27017/test_dtel';
})

gulp.task('runMocha', ['env:test'], function () {
  return gulp.src(['./tests/*.spec.js', './tests/helper.js'], {read: false})
    .pipe(plugins.mocha({
      reporter: 'spec'
    }))
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .on('end', function () {
      process.exit(0);
    })
})

gulp.task('test', ['runMocha']);
