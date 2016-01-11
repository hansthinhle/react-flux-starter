import gulp from 'gulp';
import taskDir from 'task-dir';
import runSequence from 'run-sequence';
import path from 'path';

taskDir(gulp, path.join(__dirname, 'test'));

export default (callback) => {
  runSequence('test:lint', callback);
};
