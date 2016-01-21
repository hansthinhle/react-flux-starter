import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin'
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
    app: path.join(__dirname, 'app/app.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    hashDigestLength: 32,
    filename: '[hash].js',
    chunkFilename: '[chunkhash].js',
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
      },
      {
        test: /\.html$/,
        loader: 'html-loader?interpolate'
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
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new ExtractTextPlugin('[contenthash].css'),
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
    new ManifestPlugin({
      fileName: 'webpack-manifest.json'
    })
  ],
  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
    failOnError: true,
    emitError: true
  },
  postcss: () => {
    return [
      autoprefixer(autoprefixerOptions),
      cssnano({
        safe: true,
        discardComments: {removeAll: true}
      })
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
  progress: true,
  profile: true,
  bail: true
};
