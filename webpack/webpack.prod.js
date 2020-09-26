const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

const {
  prod_Path,
  src_Path
} = require('./path');

module.exports = {
  entry: {
    main: './' + src_Path + '/index.ts',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, prod_Path),
    filename: 'form-saver.js',
  },
  //devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }, ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
