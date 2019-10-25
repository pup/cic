const merge = require('webpack-merge');
const {
  generateConfigs
} = require('./webpack.common.js');
const createVariants = require('parallel-webpack')
  .createVariants;

const variants = {
  minimize: [true, false]
};

function createVariantsCallback({
  minimize
}) {
  return {
    mode: 'production',
    devtool: minimize ? 'source-map' : 'none',
    optimization: {
      minimize
    }
  }
}

let envVariants = createVariants(variants,
  createVariantsCallback);

module.exports = generateConfigs(envVariants);
