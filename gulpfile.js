'use strict';

var pkg = require('./package.json');
var gulp = require('gulp');
var favicons = require('favicons').stream;
var eslint = require('gulp-eslint');
var del = require('del');
var webpackStatsHelper = require('./webpack-stats-helper');
var path = require('path');
var RevAll = require('gulp-rev-all');
var revReplace = require('gulp-rev-replace');
var preprocess = require('gulp-preprocess');
var frep = require('gulp-frep');
var htmlmin = require('gulp-htmlmin');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.prod.config');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var devHost = 'http://localhost:3000';
var prodHost = 'http://example.com';
var devFaviconsPath = '/assets/images/favicons/';
var prodFaviconsPath = '/';

gulp.task('favicons', function () {
  return gulp.src('app/assets/images/favicon.png')
    .pipe(favicons({
      appName: pkg.name,
      appDescription: pkg.description,
      version: pkg.version,
      background: '#fff',
      url: devHost + devFaviconsPath,
      path: devFaviconsPath,
      html: 'app/_favicons.html',
      logging: true
    }))
    .pipe(gulp.dest('app' + devFaviconsPath));
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
    .src(['app' + devFaviconsPath + '**/*'])
    .pipe(rev.revision())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifestFile())
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  var patterns = webpackStatsHelper.getReplacePatterns(path.join(__dirname, './dist/webpack.stats.json'));
  patterns.push({
    pattern: new RegExp(devFaviconsPath, 'g'),
    replacement: prodFaviconsPath
  });
  patterns.push({
    pattern: new RegExp(devHost.replace('//', '/'), 'g'),
    replacement: prodHost
  });
  var manifest = gulp.src('dist/rev-favicons-manifest.json');
  return gulp.src(['app/*.html', '!app/_*.html'])
    .pipe(preprocess({
      options: {
        srcDir: path.join(__dirname, 'app')
      }
    }))
    .pipe(frep(patterns))
    .pipe(revReplace({manifest: manifest}))
    .pipe(htmlmin())
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
