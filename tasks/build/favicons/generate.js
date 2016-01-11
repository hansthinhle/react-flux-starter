import gulp from 'gulp';
import {stream as favicons} from 'favicons';
import pkg from '../../../package.json';
import config from '../../../config.json';

const hostname = config.hostname || 'localhost';
const port = config.port || 3000;
const devURL = `http://${hostname}:${port}`;

export default () => {
  return gulp.src('app/assets/images/favicon.png')
    .pipe(favicons({
      appName: pkg.name,
      appDescription: pkg.description,
      version: pkg.version,
      background: '#fff',
      url: devURL,
      path: '/assets/images/favicons/',
      html: 'app/_favicons.html',
      logging: true
    }))
    .pipe(gulp.dest('app/assets/images/favicons'));
};
