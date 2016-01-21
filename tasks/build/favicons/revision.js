import gulp from 'gulp';
import RevAll from 'gulp-rev-all';
import path from 'path';

export default () => {
  let revAll = new RevAll({
    fileNameManifest: 'favicons-manifest.json',
    transformFilename: function (file, hash) {
      let ext = path.extname(file.path);
      return hash.substr(0, 32) + ext;
    }
  });
  return gulp
    .src(['app/assets/images/favicons/**/*'])
    .pipe(revAll.revision())
    .pipe(gulp.dest('dist'))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest('dist'));
};
