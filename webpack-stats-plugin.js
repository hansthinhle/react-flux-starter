import fs from 'fs';
import path from 'path';

const handleFilePath = (file) => {
  file = file || 'webpack.stats.json';
  if (!path.isAbsolute(file)) {
    file = path.join(process.cwd(), file);
  }
  return path.normalize(file);
};

const defaultOptions = {
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: false,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false
};

class StatsPlugin {
  constructor(file, options) {
    this.file = handleFilePath(file);
    this.options = defaultOptions;
    for (let optionName in options) {
      this.options[optionName] = options[optionName];
    }
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      let stats = JSON.stringify(compilation.getStats().toJson(this.options));
      compilation.assets[this.file] = {
        source: () => {
          return stats;
        },
        size: () => {
          return stats.length;
        }
      };
      callback();
    });
  }

  static getProperty(name, file) {
    file = handleFilePath(file);
    if (!fs.existsSync(file)) {
      return undefined;
    }
    let stats = require(file);
    return stats[name];
  }

  static getReplacePatterns(file) {
    let patterns = [];
    let assetsByChunkName = this.getProperty('assetsByChunkName', file) || {};
    for (let chunkName in assetsByChunkName) {
      let assets = assetsByChunkName[chunkName];
      if (typeof assets === 'string') {
        let ext = path.extname(assets);
        let pattern = {
          pattern: chunkName + ext,
          replacement: assets
        };
        patterns.push(pattern);
      } else {
        assets.forEach(asset => {
          let ext = path.extname(asset);
          let pattern = {
            pattern: chunkName + ext,
            replacement: asset
          };
          patterns.push(pattern);
        });
      }
    }
    return patterns;
  };
}

export default StatsPlugin;
