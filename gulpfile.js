'use strict';

var pkg = require('./package.json');
var gulp = require('gulp');
var del = require('del');
var webpackStatsHelper = require('./webpack-stats-helper');
var path = require('path');
var preProcess = require('gulp-preprocess');
var frep = require('gulp-frep');
var minifyHtml = require('gulp-minify-html');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.prod.config');
var webpack = require('webpack');
var runSequence = require('run-sequence');


gulp.task('clean', function () {
  del.sync(['dist']);
});

gulp.task('webpack', function () {
  return gulp
    .src(['app/app.js'])
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  var patterns = webpackStatsHelper.getReplacePatterns(path.join(__dirname, './dist/webpack.stats.json'));
  return gulp.src(['app/*.html'])
    .pipe(preProcess())
    .pipe(frep(patterns))
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
  return gulp
    .src(['app/*', '!app/*.{html,js}'], {nodir: true})
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function (callback) {
  runSequence('clean', 'webpack', 'html', 'copy', callback);
});
