var webpack = require('webpack');
var path = require('path');

var entry = {
  app: path.resolve(__dirname, './app/app.js')
};

var scssIncludePaths = [
  path.resolve(__dirname, './app/bower_components'),
  path.resolve(__dirname, './node_modules')
];

var autoprefixer = {
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

module.exports = {
  entry: Object.keys(entry).reduce(function (result, key) {
    result[key] = [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/dev-server',
      entry[key]
    ];
    return result;
  }, {}),
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
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?' + JSON.stringify(autoprefixer) + '!sass-loader?outputStyle=expanded&' + scssIncludePaths.join('&includePaths[]=')
      },
      {
        test: /\.sass$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?' + JSON.stringify(autoprefixer) + '!sass-loader?indentedSyntax=sass'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?' + JSON.stringify(autoprefixer) + '!less-loader'
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
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  eslint: {
    configFile: path.resolve(__dirname, './.eslintrc')
  },
  devtool: 'eval',
  debug: true
};
