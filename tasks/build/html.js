import gulp from 'gulp';
import StatsPlugin from '../../webpack-stats-plugin';
import path from 'path';
import config from '../../config.json';
import preprocess from 'gulp-preprocess';
import frep from 'gulp-frep';
import revReplace from 'gulp-rev-replace';
import htmlmin from 'gulp-htmlmin';

const hostname = config.hostname || 'localhost';
const port = config.port || 3000;
const devURL = `http://${hostname}:${port}`;
const prodURL = config.prodURL;

export default () => {
  let patterns = StatsPlugin.getReplacePatterns('dist/webpack.stats.json');
  patterns.push({
    pattern: new RegExp('/assets/images/favicons/', 'g'),
    replacement: '/'
  });
  patterns.push({
    pattern: new RegExp(devURL.replace('//', '/'), 'g'),
    replacement: prodURL
  });
  let manifest = gulp.src('dist/rev-favicons-manifest.json');
  return gulp.src(['app/*.html', '!app/_*.html'])
    .pipe(preprocess({
      options: {
        srcDir: path.join(__dirname, 'app')
      }
    }))
    .pipe(frep(patterns))
    .pipe(revReplace({manifest: manifest}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
};
