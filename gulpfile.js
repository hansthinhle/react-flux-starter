'use strict';

var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var del = require('del');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var minifyHtml = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');
var runSequence = require('run-sequence');
var karma = require('gulp-karma');
var opn = require('opn');

var isBuild = false;
var isOpen = false;
var autoprefixerBrowsers = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('clean', function () {
  del.sync(['.tmp', 'dist']);
});

gulp.task('webpack', function () {
  var webpackConfigs = require('./webpack.config.js');
  webpackConfigs.quiet = !isBuild;
  return gulp.src('app/*.{js,jsx}')
    .pipe(named())
    .pipe(webpack(webpackConfigs))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('webpack:watch', function () {
  var webpackConfigs = require('./webpack.config.js');
  webpackConfigs.watch = true;
  return gulp.src('app/*.{js,jsx}')
    .pipe(named())
    .pipe(webpack(webpackConfigs, null, function (error, stats) {
      if (error) {
        gulpUtil.log(error.toString());
      } else {
        gulpUtil.log(stats.toString({
          colors: gulpUtil.colors.supportsColor,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false,
          modules: false,
          children: false,
          version: true,
          cached: false,
          cachedAssets: false,
          reasons: false,
          source: false,
          errorDetails: false
        }));
        if (!isOpen) {
          opn('http://localhost:3000', null, function () {
            isOpen = true;
          });
        }
      }
    }))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('html', ['webpack'], function () {
  return gulp.src('app/*.html')
    .pipe(minifyHtml({empty: true, cdata: true, conditionals: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
  return gulp.src('.tmp/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  return gulp.src('.tmp/*.css')
    .pipe(autoprefixer(autoprefixerBrowsers))
    .pipe(csso())
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('.tmp/*.{png,jpg,gif}')
    .pipe(imagemin({
      optimizationLevel: 3,
      interlaced: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function () {
  return gulp.src('.tmp/*.{ttf,eot,svg,woff,woff2}')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
  return gulp.src(['app/*.*', '!app/*.{html,js}'], {dot: true})
    .pipe(gulp.dest('dist'));
});

gulp.task('browserSync', function (callback) {
  browserSync({
    files: ['app/*.html', '.tmp/**/*'],
    server: {
      baseDir: ['.tmp', 'app'],
      middleware: [
        modRewrite([
          '!\\.\\w+$ /index.html [L]'
        ])
      ]
    },
    port: 3000,
    reloadOnRestart: false,
    open: false
  });
  callback();
});

gulp.task('serve', function (callback) {
  runSequence('clean', 'webpack', 'browserSync', 'webpack:watch', callback);
});

gulp.task('test', function () {
  return gulp.src('test/spec/**/*.js')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

gulp.task('build', function (callback) {
  isBuild = true;
  runSequence('clean', 'html', 'scripts', 'styles', 'images', 'fonts', 'copy', callback);
});

gulp.task('serve:dist', ['build'], function () {
  browserSync({
    server: {
      baseDir: 'dist',
      middleware: [
        modRewrite([
          '!\\.\\w+$ /index.html [L]'
        ])
      ]
    }
  });
});

gulp.task('default', function () {
  gulp.start('build');
});
