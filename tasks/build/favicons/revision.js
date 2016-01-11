import gulp from 'gulp';
import RevAll from 'gulp-rev-all';
import path from 'path';
import webpackConfig from '../../../webpack.prod.config';

export default () => {
  let rev = new RevAll({
    fileNameManifest: 'rev-favicons-manifest.json',
    transformFilename: function (file, hash) {
      let ext = path.extname(file.path);
      return hash.substr(0, webpackConfig.output.hashDigestLength || 32) + ext;
    }
  });
  return gulp
    .src(['app/assets/images/favicons/**/*'])
    .pipe(rev.revision())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifestFile())
    .pipe(gulp.dest('dist'));
};
