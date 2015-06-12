var path = require('path');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var webpackStatsHelper = require('./webpack.stats.helper');

var scssIncludePaths = [
  path.resolve(__dirname, './app/bower_components'),
  path.resolve(__dirname, './node_modules')
];

module.exports = {
  entry: {
    app: path.resolve(__dirname, './app/app.js')
  },
  output: {
    filename: '[hash].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
    alias: {
      app: path.resolve(__dirname, './app'),
      test: path.resolve(__dirname, './test')
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?stage=0'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: extractTextWebpackPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: extractTextWebpackPlugin.extract('style-loader', 'css-loader!sass-loader?outputStyle=expanded&' + scssIncludePaths.join('&includePaths[]='))
      },
      {
        test: /\.sass$/,
        loader: extractTextWebpackPlugin.extract('style-loader', 'css-loader!sass-loader?indentedSyntax=sass')
      },
      {
        test: /\.less$/,
        loader: extractTextWebpackPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=[hash].[ext]'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
        loader: 'file-loader?name=[hash].[ext]'
      }
    ]
  },
  stats: {
    children: false
  },
  eslint: {
    configFile: path.resolve(__dirname, './.eslintrc')
  },
  plugins: [
    new extractTextWebpackPlugin('[contenthash].css'),
    new webpackStatsHelper.saveToFile()
  ]
};
