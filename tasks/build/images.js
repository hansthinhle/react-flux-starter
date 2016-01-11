import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

export default () => {
  return gulp
    .src(['dist/**/*.{jpg,png,gif,svg}'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist'));
};
