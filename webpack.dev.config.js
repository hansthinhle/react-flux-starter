var webpack = require('webpack');
var path = require('path');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var scssIncludePaths = [
  path.resolve(__dirname, './app/bower_components'),
  path.resolve(__dirname, './node_modules')
];

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './app/app.js')
  ],
  output: {
    path: path.resolve('./dist'),
    filename: 'app.js',
    chunkFilename: '[name].chunk.js',
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
        loader: 'react-hot-loader!babel-loader'
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
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  eslint: {
    configFile: path.resolve(__dirname, './.eslintrc')
  },
  plugins: [
    new extractTextWebpackPlugin('app.css'),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'eval',
  debug: true
};
