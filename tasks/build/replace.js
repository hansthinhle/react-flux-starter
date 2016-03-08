import gulp from 'gulp';
import frep from 'gulp-frep';
import config from '../../config.json';

const devURL = config.devURL;
const prodURL = config.prodURL;

export default () => {
  let webpackManifest = require('../../dist/webpack-manifest.json');
  let faviconsManifest = require('../../dist/favicons-manifest.json');
  let manifest = Object.assign(webpackManifest, faviconsManifest);
  let patterns = [
    {
      pattern: new RegExp('/assets/images/favicons/', 'g'),
      replacement: '/'
    },
    {
      pattern: new RegExp(devURL, 'g'),
      replacement: prodURL
    }
  ];
  for (let pattern in manifest) {
    let replacement = manifest[pattern];
    patterns.push({
      pattern: new RegExp('/' + pattern, 'g'),
      replacement: '/' + replacement
    });
  }
  return gulp.src(['dist/*.{html,js,css,json,xml,webapp}', '!dist/*-manifest.json'])
    .pipe(frep(patterns))
    .pipe(gulp.dest('dist'));
};
