'use strict';

var gulp = require('gulp');
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

gulp.task('clean', function () {
  del.sync(['.tmp', 'dist']);
});

gulp.task('webpack', function () {
  return gulp.src(['app/*.{js,jsx}'])
    .pipe(named())
    .pipe(webpack(require('./webpack.config.js')))
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
    .pipe(autoprefixer('last 1 version'))
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

gulp.task('preServe', function (callback) {
  runSequence('clean', 'webpack', callback);
});

gulp.task('serve', ['preServe'], function () {
  browserSync({
    files: ['app/*.html', '.tmp/**/*'],
    server: {
      baseDir: ['.tmp', 'app'],
      middleware: [
        modRewrite([
          '!\\.\\w+$ /index.html [L]'
        ])
      ]
    }
  });

  gulp.watch(['app/**/*', '!app/**/*.html'], ['webpack']);
});

gulp.task('test', function () {
  return gulp.src('test/spec/**/*.js')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

gulp.task('build', function (callback) {
  runSequence('clean', 'html', 'scripts', 'styles', 'images', 'fonts', 'copy', callback);
});

gulp.task('serve:dist', ['build'], function () {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('default', function () {
  gulp.start('build');
});
