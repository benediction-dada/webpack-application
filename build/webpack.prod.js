const base = require('./webpack.base')
const { merge } = require('webpack-merge')

module.exports = merge(base, {
  // devtool: 'source-map',
  mode: 'production'
})