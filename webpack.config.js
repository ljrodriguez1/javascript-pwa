const path = require('path');
const { SourceMapDevToolPlugin } = require("webpack");


module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'ctm.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 9000,
  },
};