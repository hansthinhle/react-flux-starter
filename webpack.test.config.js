var webpack = require('webpack');
var path = require('path');

var entry = {
  app: path.join(__dirname, './app/app.js')
};

var scssIncludePaths = [
  path.join(__dirname, './app/bower_components'),
  path.join(__dirname, './node_modules')
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
    result[key] = entry[key];
    return result;
  }, {}),
  output: {
    path: path.join('./dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
    alias: {
      app: path.join(__dirname, './app'),
      test: path.join(__dirname, './test')
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  eslint: {
    configFile: path.join(__dirname, './.eslintrc')
  }
};
