const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { prod_Path, src_Path } = require('./path');

module.exports = {
  entry: {
    main: './' + 'src' + '/index.ts',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, prod_Path),
    filename: '[name].[chunkhash].js',
  },
  devtool: 'source-map',
  devServer: {
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      template: './' + 'src' + '/index.html',
      filename: 'index.html',
    }),
  ],
};
