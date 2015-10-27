var fs = require('fs');
var path = require('path');

function getExtension(file) {
  file = file || '';
  var arr = file.split('.');
  return arr.slice(-1)[0];
}

var webpackStatsHelper = {
  StatsToFilePlugin: function (fileName, options) {
    fileName = fileName || './webpack.stats.json';
    options = options || {};
    return function () {
      this.plugin('done', function (stats) {
        var defaultOptions = {
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
        for (var option in options) {
          if (options.hasOwnProperty(option)) {
            defaultOptions[option] = options[option];
          }
        }
        fs.writeFileSync(fileName, JSON.stringify(stats.toJson(defaultOptions)));
      });
    }
  },
  getProperty: function (name, fileName) {
    fileName = fileName || './webpack.stats.json';
    var stats = require(fileName);
    return stats[name];
  },
  getReplacePatterns: function (fileName) {
    var patterns = [];
    var assetsByChunkName = this.getProperty('assetsByChunkName', fileName) || {};
    for (var chunkName in assetsByChunkName) {
      if (assetsByChunkName.hasOwnProperty(chunkName)) {
        var assets = assetsByChunkName[chunkName];
        if (typeof assets === 'string') {
          var ext = path.extname(assets);
          var pattern = {
            pattern: chunkName + ext,
            replacement: assets
          };
          patterns.push(pattern);
        } else {
          assets.forEach(function (asset) {
            var ext = path.extname(asset);
            var pattern = {
              pattern: chunkName + ext,
              replacement: asset
            };
            patterns.push(pattern);
          });
        }
      }
    }
    return patterns;
  }
};

module.exports = webpackStatsHelper;
