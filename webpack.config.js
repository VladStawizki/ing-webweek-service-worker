const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin(['service-worker.js', 'assets']),
    new HtmlWebpackPlugin({
        template: './index.ejs'
    }),
  ]
};
