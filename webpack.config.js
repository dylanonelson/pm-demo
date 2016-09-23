var path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css',
      exclude: /node_modules/,
    }]
  },
  resolve: {
    root: path.resolve('./src')
  }
};

