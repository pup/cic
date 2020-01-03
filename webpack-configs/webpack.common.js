const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const createVariants = require('parallel-webpack').createVariants;

let outputPath = path.resolve(__dirname, '../dist');
let contextPath = path.resolve(__dirname, '..');

fs.emptyDirSync(outputPath);

let baseConfig = {
  context: contextPath,

  output: {
    path: outputPath,
    globalObject: 'this',
    libraryTarget: 'umd'
  },

  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                modules: false,
                corejs: 3
              }]
            ],
            plugins: [
              ["@babel/plugin-proposal-class-properties", {
                "loose": true
              }],
              "add-module-exports",
              "@babel/plugin-transform-modules-commonjs"
            ]
          },
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ]
};

function createVariantsCallback({ envVariants }) {
  return merge.smart(baseConfig, {
    entry: './src/index.js',
    output: {
      library: 'Cic',
      filename: 'cic' + (envVariants.optimization.minimize ?
        '.min.js' : '.js')
    }
  }, envVariants);
}

const generateConfigs = function(envVariants) {
  return createVariants({ envVariants }, createVariantsCallback);
};

module.exports = { generateConfigs }