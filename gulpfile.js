'use strict';

var pkg = require('./package.json');
var gulp = require('gulp');
var util = require('gulp-util');
var favicons = require('favicons');
var eslint = require('gulp-eslint');
var del = require('del');
var webpackStatsHelper = require('./webpack-stats-helper');
var path = require('path');
var RevAll = require('gulp-rev-all');
var revReplace = require('gulp-rev-replace');
var preProcess = require('gulp-preprocess');
var frep = require('gulp-frep');
var minifyHtml = require('gulp-minify-html');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.prod.config');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('favicons', function (callback) {
  favicons({
    files: {
      src: 'app/assets/images/favicon.png',
      dest: 'app/assets/images/favicons',
      html: 'app/_favicons.html',
      iconsPath: '/assets/images/favicons'
    },
    settings: {
      appName: pkg.name,
      appDescription: pkg.description,
      version: pkg.version,
      background: '#fff'
    }
  }, function (error, metadata) {
    if (error) {
      return callback(error);
    }
    util.log('Generated favicons at', util.colors.magenta('app/assets/images/favicons'));
    util.log('Generated favicons metadata at', util.colors.magenta('app/_favicons.html'));
    callback();
  });
});

gulp.task('lint', function () {
  return gulp
    .src(['app/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('clean', function () {
  del.sync(['dist']);
});

gulp.task('webpack', function () {
  return gulp
    .src(['app/app.js'])
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('dist'));
});

gulp.task('revFavicons', function () {
  var rev = new RevAll({
    fileNameManifest: 'rev-favicons-manifest.json',
    transformFilename: function (file, hash) {
      var ext = path.extname(file.path);
      return hash.substr(0, webpackConfig.output.hashDigestLength || 32) + ext;
    }
  });
  return gulp
    .src(['app/assets/images/favicons/**/*'])
    .pipe(rev.revision())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifestFile())
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  var patterns = webpackStatsHelper.getReplacePatterns(path.join(__dirname, './dist/webpack.stats.json'));
  patterns.push({
    pattern: /(\/assets\/images\/favicons\/)/g,
    replacement: '/'
  });
  var manifest = gulp.src('dist/rev-favicons-manifest.json');
  return gulp.src(['app/*.html', '!app/_*.html'])
    .pipe(preProcess({
      options: {
        srcDir: path.join(__dirname, 'app')
      }
    }))
    .pipe(frep(patterns))
    .pipe(revReplace({manifest: manifest}))
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
  return gulp
    .src(['app/*', '!app/*.{html,js}'], {nodir: true})
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp
    .src(['dist/**/*.{jpg,png,gif,svg}'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function (callback) {
  runSequence('clean', 'webpack', 'revFavicons', 'html', 'copy', 'images', callback);
});
