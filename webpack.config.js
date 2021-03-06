const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',

  devServer: {
    hot: false,
    inline: false,
    port: 8082
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin(['service-worker.js', 'assets']),
    new HtmlWebpackPlugin({
        template: './index.ejs'
    }),
    new WebpackPwaManifest({
      name: 'Hello Webweek',
      short_name: 'MyPWW3',
      fingerprints: false,
      description: 'Hello WebWeek Step 3',
      background_color: '#ffffff',
      icons: [
        {
          src: path.resolve('icon_512x512.png'),
          size: '512x512'
        }
      ]
    }),
  ]
};
