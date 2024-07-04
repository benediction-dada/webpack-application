const base = require('./webpack.base')
const { merge } = require('webpack-merge')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: 'localhost',
    port: 7013,
    open: true,
    hot: true
  }
})
