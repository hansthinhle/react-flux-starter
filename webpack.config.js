var path = require('path');
var webpack = require('webpack');
var bowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  output: {
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'jsx-loader?harmony'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&' +
        'includePaths[]=' +
        (path.resolve(__dirname, './app/libraries')) + '&' +
        'includePaths[]=' +
        (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /\.sass$/,
        loader: 'style!css!sass?indentedSyntax=sass'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=[name].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=8192&minetype=application/font-woff&name=[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new bowerWebpackPlugin({
      modulesDirectories: ['app/libraries'],
      excludes: /.*\.less/
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'windows.jQuery': 'jquery'
    })
  ]
};