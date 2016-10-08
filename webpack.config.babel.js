var path = require('path');
var webpack = require('webpack');
var config = require('./config').default;

var bundlePlugins = [];
var bundleEntry;
var bundlePublicPath;
var bundleModules = {
  loaders: [{
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  }, {
    test: /\.(png|jpg|ttf|eot|woff|woff2)$/,
    loader: 'url-loader?limit=1000',
  }],
  preLoaders: [{
    test: /\.(js|jsx)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
  }]
};

if (config.PROD_ENV) {
  var uglyfier = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    minimize: true,
  });

  bundleEntry = './src/client/app.jsx';
  bundlePublicPath = '/assets/js';

  bundlePlugins.push(uglyfier);
} else {
  bundleEntry = [
    'webpack-dev-server/client?http://localhost:' + config.DEV_SERVER_PORT,
    'webpack/hot/only-dev-server',
    './src/client/app.jsx',
  ];
  bundlePublicPath = 'http://localhost:' + config.DEV_SERVER_PORT + '/assets/js';

  bundlePlugins.push(new webpack.HotModuleReplacementPlugin());
  bundleModules.loaders[0] = {
    test: /\.(js|jsx)$/,
    loaders: ['react-hot', 'babel-loader'],
    exclude: /node_modules/,
  };
}

var bundle = {
  name: 'bundle',
  entry: bundleEntry,
  output: {
    path: path.resolve('public/js/'),
    filename: config.PROD_ENV ? 'app.min.js' : 'app.js',
    publicPath: bundlePublicPath,
  },
  devtool: config.PROD_ENV ? '' : 'source-map',
  module: bundleModules,
  plugins: bundlePlugins,
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

module.exports = bundle;