const merge = require('webpack-merge');
const { generateConfigs } = require('./webpack.common.js');

module.exports = generateConfigs([{
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: { minimize: false }
}]);
