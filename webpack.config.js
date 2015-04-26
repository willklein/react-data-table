var autoprefixer = require('autoprefixer-core');
var csswring     = require('csswring');
var path = require('path');
var postcssnested = require('postcss-nested');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './scripts/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/scripts/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'scripts')
      },
      {
        test:   /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
        include: path.join(__dirname, 'styles')
      }
    ]
  },
  postcss: [postcssnested]
};
