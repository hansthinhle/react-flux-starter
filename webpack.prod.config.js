var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var pkg = require('./package.json');
var webpackStatsHelper = require('./webpack-stats-helper');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var scssIncludePaths = [
  path.join(__dirname, 'app/assets/bower_components'),
  path.join(__dirname, 'node_modules')
];

var autoprefixerOptions = {
  browsers: [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ]
};

var banner =
  'Name: ' + pkg.name + '\n' +
  'Version: ' + pkg.version + '\n' +
  'Description: ' + pkg.description;

module.exports = {
  entry: {
    app: path.join(__dirname, 'app/app.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[hash].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
    alias: {
      app: path.join(__dirname, 'app')
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
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader?outputStyle=expanded&' + scssIncludePaths.join('&includePaths[]='))
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader?indentedSyntax=sass')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
      },
      {
        test: /\.(png|jpg|gif|swf)$/,
        loader: 'file-loader?name=[hash].[ext]'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
        loader: 'file-loader?name=[hash].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('[contenthash].css'),
    new webpack.BannerPlugin(banner),
    new webpackStatsHelper.StatsToFilePlugin(path.join(__dirname, 'dist/webpack.stats.json'))
  ],
  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
    failOnError: true,
    emitError: true
  },
  postcss: function () {
    return [
      autoprefixer(autoprefixerOptions),
      cssnano({discardComments: {removeAll: true}})
    ];
  },
  node: {
    net: 'mock',
    dns: 'mock'
  },
  stats: {
    children: false,
    version: false
  },
  debug: false,
  devtool: 'eval',
  progress: true,
  profile: true,
  bail: true
};
