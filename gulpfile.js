'use strict';

var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var del = require('del');
var webpack = require('webpack-stream');
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
var webpackStatsHelper = require('./webpack.stats.helper');
var replace = require('gulp-replace-task');
var proxy = require('proxy-middleware');
var url = require('url');

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
var webpackStatsOptions = {
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
};
var proxyOptions = [
  //{
  //  endpoint: 'http://localhost:8000/api',
  //  route: '/api'
  //}
];

function openApp() {
  if (!isOpen) {
    opn('http://localhost:3000', null, function () {
      isOpen = true;
    });
  }
}

function handleWebpack(error, stats) {
  if (error) {
    gulpUtil.log(error.toString());
  } else {
    gulpUtil.log(stats.toString(webpackStatsOptions));
    openApp();
  }
}

function createProxyOption(endpoint, route) {
  var proxyOption = url.parse(endpoint);
  proxyOption.route = route;
  proxyOption.rejectUnauthorized = false;
  return proxyOption;
}

gulp.task('clean', function () {
  del.sync(['.tmp', 'dist']);
});

gulp.task('webpack:dev', function () {
  var webpackConfigs = require('./webpack.dev.config.js');
  webpackConfigs.quiet = true;
  return gulp.src(['app/*.{js,jsx}'])
    .pipe(named())
    .pipe(webpack(webpackConfigs))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('webpack:watch', function () {
  var webpackConfigs = require('./webpack.dev.config.js');
  webpackConfigs.watch = true;
  return gulp.src('app/*.{js,jsx}')
    .pipe(named())
    .pipe(webpack(webpackConfigs, null, handleWebpack))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('webpack:build', function () {
  var webpackConfigs = require('./webpack.build.config.js');
  return gulp.src(['app/*.{js,jsx}'])
    .pipe(named())
    .pipe(webpack(webpackConfigs))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('html', ['webpack:build'], function () {
  var patterns = webpackStatsHelper.getReplacePatterns();
  return gulp.src('app/*.html')
    .pipe(replace({
      patterns: patterns,
      usePrefix: false
    }))
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
  var middleware = proxyOptions.map(function (proxyOption) {
    return proxy(createProxyOption(proxyOption.endpoint, proxyOption.route));
  });
  middleware.push(modRewrite([
    '!\\.\\w+$ /index.html [L]'
  ]));
  browserSync({
    files: ['app/*.html', '.tmp/**/*', '!.tmp/**/*.css'],
    server: {
      baseDir: ['.tmp', 'app'],
      middleware: middleware
    },
    port: 3000,
    reloadOnRestart: false,
    open: false
  });
  callback();
});

gulp.task('serve', function (callback) {
  runSequence('clean', 'webpack:dev', 'browserSync', 'webpack:watch', callback);
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
  var middleware = proxyOptions.map(function (proxyOption) {
    return proxy(createProxyOption(proxyOption.endpoint, proxyOption.route));
  });
  middleware.push(modRewrite([
    '!\\.\\w+$ /index.html [L]'
  ]));
  browserSync({
    server: {
      baseDir: 'dist',
      middleware: middleware
    }
  });
});

gulp.task('default', function () {
  gulp.start('build');
});
