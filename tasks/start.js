import {spawnSync} from 'child_process';

export default (callback) => {
  let start = spawnSync('babel-node', ['webpack.dev.server.js'], {stdio: 'inherit'});
  if (start.stderr) {
    callback(start.stderr);
  }
};