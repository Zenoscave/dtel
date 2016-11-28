'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

var paths = {
  js: [
    './*.js',
    'app/**/*.js',
    'common/**/*.js',
    'config/**/*.js',
    'gulp/**/*.js',
    'tests/**/*.js',
    'views/**/*.js'
  ]
};

var defaultTasks = ['devServe', 'watch'];

gulp.task('env:development', function () {
  process.env.NODE_ENV = 'development';
  process.env.MONGODB_URI = 'mongodb://localhost:27017/dev_dtel';
});

gulp.task('standard', function () {
  return gulp.src(paths.js)
    .pipe(plugins.standard())
    .pipe(plugins.standard.reporter('default', {
      quiet: false,
      breakOnError: true,
      breakOnWarning: true
    }));
});

gulp.task('devServe', ['env:development'], function () {
  plugins.nodemon({
    script: 'runner.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development',
      'MONGODB_URI': 'mongodb://localhost:27017/dev_dtel'
    },
    ignore: [
      'node_modules/'
    ],
    nodeArgs: ['--debug']
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if (/Server started on port /.test(chunk)) {
        setTimeout(function () {
          plugins.livereload.reload()
        }, 500)
      }
      console.log(chunk);
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('watch', function () {
  plugins.livereload.listen({
    interval: 500
  });

  //gulp.watch(paths.js, ['standard'])
});

gulp.task('development', defaultTasks);
