import gulp from 'gulp';
import taskDir from 'task-dir';
import path from 'path';
import runSequence from 'run-sequence';

taskDir(gulp, path.join(__dirname, 'favicons'));

export default (callback) => {
  runSequence('build:favicons:clean', 'build:favicons:generate', 'build:favicons:revision', callback);
};
