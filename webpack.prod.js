const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = merge(config, {
  mode: 'production',
  output: {
    filename: '[name].built.js',
    path: __dirname + '/build',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // Copy data.json to `build` folder
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'build')
        }
      ]
    })
  ]
});
