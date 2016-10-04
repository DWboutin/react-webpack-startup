var path = require('path');
var webpack = require('webpack');
var config = require('./config').default;

var webpackPlugins = [];
var webpackEntry;
var webpackPublicPath;
var webpackModules = {
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

  webpackEntry = './src/client/app.jsx';
  webpackPublicPath = '/assets/js';

  webpackPlugins.push(uglyfier);
} else {
  webpackEntry = [
    'webpack-dev-server/client?http://localhost:' + config.DEV_SERVER_PORT,
    'webpack/hot/only-dev-server',
    './src/client/app.jsx',
  ];
  webpackPublicPath = 'http://localhost:' + config.DEV_SERVER_PORT + '/assets/js';

  webpackPlugins.push(new webpack.HotModuleReplacementPlugin());
  webpackModules.loaders[0] = {
    test: /\.(js|jsx)$/,
    loaders: ['react-hot', 'babel-loader'],
    exclude: /node_modules/,
  };
}

var webpackTask = {
  entry: webpackEntry,
  output: {
    path: path.resolve('public/js/'),
    filename: config.PROD_ENV ? 'app.min.js' : 'app.js',
    publicPath: webpackPublicPath,
  },
  // devtool: config.PROD_ENV ? "" : "source-map",
  module: webpackModules,
  plugins: webpackPlugins,
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

module.exports = webpackTask;