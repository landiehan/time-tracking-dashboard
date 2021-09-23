const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { index: './src/index.js' },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.pug' })],
  module: {
    rules: [
      {
        test: /\.pug$/i,
        loader: 'pug-loader'
      },
      {
        test: /\.(svg|png)$/i,
        type: 'asset/resource'
      }
    ]
  }
};
