import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const scssIncludePaths = [
  path.join(__dirname, 'app/assets/bower_components'),
  path.join(__dirname, 'node_modules')
];

const autoprefixerOptions = {
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

export default {
  entry: {
    app: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, 'app/app.js')]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },
  resolve: {
    root: path.join(__dirname, 'app'),
    extensions: ['', '.jsx', '.js'],
    alias: {
      actions: path.join(__dirname, 'app/actions'),
      assets: path.join(__dirname, 'app/assets'),
      components: path.join(__dirname, 'app/components'),
      constants: path.join(__dirname, 'app/constants'),
      services: path.join(__dirname, 'app/services'),
      stores: path.join(__dirname, 'app/stores'),
      utils: path.join(__dirname, 'app/utils')
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
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&' + scssIncludePaths.join('&includePaths[]=')
      },
      {
        test: /\.sass$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax=sass'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.(png|jpg|gif|swf)$/,
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
      'pkg': JSON.stringify(pkg)
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
    failOnError: false,
    emitError: false
  },
  postcss: () => {
    return [autoprefixer(autoprefixerOptions)];
  },
  node: {
    net: 'mock',
    dns: 'mock'
  },
  debug: true,
  devtool: 'eval'
};

