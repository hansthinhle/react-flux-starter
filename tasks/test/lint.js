import gulp from 'gulp';
import eslint from 'gulp-eslint';

export default () => {
  return gulp
    .src(['app/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};
