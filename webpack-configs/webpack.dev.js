const merge = require('webpack-merge');
const {
  generateConfigs
} = require('./webpack.common.js');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {
//   CleanWebpackPlugin
// } = require('clean-webpack-plugin');

module.exports = generateConfigs([{
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    minimize: false
  }
}]);

// let newConfig = common.map((config, index) => {
// // module.exports =  common.map((config, index) => {
//   return merge({
//     customizeArray(a, b, key) {
//       if (key === 'plugins') {
//         return !!index ? a : [...b, ...a];
//       }

//       return undefined;
//     }
//   })(config, {
//     mode: 'development',
//     devtool: 'inline-source-map',
//     devServer: {
//       contentBase: './dist'
//     },
//     plugins: [
//       // new HtmlWebpackPlugin({
//       //   title: 'cic'
//       // })
//     ]
//   })
// });

// console.log("==== newConfig ==== ");
// // console.log(newConfig);
// newConfig.forEach((config) => {
//   console.log(config.module.rules[0].use);
// });
// module.exports = newConfig;