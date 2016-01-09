import gulp from 'gulp';

export default () => {
  return gulp
    .src(['app/*', '!app/*.{html,js}', '!app/config*'], {nodir: true})
    .pipe(gulp.dest('dist'));
};
