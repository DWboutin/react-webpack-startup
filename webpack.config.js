var webpack = require('webpack');
var PROD = (process.env.NODE_ENV === 'production') ? true : false;

console.log('--------------- ' + PROD);

var webpackTask = {
  entry: './src/client/app.js',
  output: {
    path: './public/js',
    filename: PROD ? 'app.min.js' : 'app.js'
  },
  devtool: PROD ? "" : "source-map",
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      minimize: true,
    })
  ] : [],
  watch: PROD ? false : true
};

module.exports = webpackTask;