var webpack = require('webpack');
var PROD = (process.env.NODE_ENV === 'production') ? true : false;
var webpackPlugins = [];

if (PROD) {
  var uglyfier = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    minimize: true,
  });

  webpackPlugins.push(uglyfier);
}

var webpackTask = {
  entry: './src/client/app.jsx',
  output: {
    path: './public/js',
    filename: PROD ? 'app.min.js' : 'app.js'
  },
  devtool: PROD ? "" : "source-map",
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
    preLoaders: [{
      test: /\.js[x]?$/,
      loader: "eslint-loader",
      exclude: /node_modules/,
    }]
  },
  plugins: webpackPlugins,
  watch: false
};

module.exports = webpackTask;