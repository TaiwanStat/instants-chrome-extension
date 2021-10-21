var path = require('path')
var webpack = require('webpack')
var rucksack = require('rucksack-css')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: './public/javascripts/index',
    settings: './public/javascripts/settings',
    status: './public/javascripts/status'
  },
  output: {
    path: path.join(__dirname, 'public/javascripts/dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel' ],
      exclude: /node_modules/,
      include: __dirname
    },
    {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
    }],
    postcss: [
      rucksack({
        autoprefixer: true
      })
    ]
  }
}
