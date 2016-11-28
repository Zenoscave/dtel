'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var defaultTasks = ['prodServe'];

gulp.task('env:production', function () {
  process.env.NODE_ENV = 'production';
  process.env.MONGODB_URI = 'mongodb://localhost:27017/dtel';
})

gulp.task('prodServe', ['env:production'], function () {
  plugins.nodemon({
    script: 'runner.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'production',
      'MONGODB_URI': 'mongodb://localhost:27017/dtel'
    },
    ignore: ['node_modules/']
  });
});
gulp.task('production', defaultTasks);
