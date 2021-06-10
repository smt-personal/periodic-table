//const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = 
{
  entry: './src/index.js',
  output:
  {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: 
  {
    rules: 
    [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  mode: 'development',
  watch: true,
};
