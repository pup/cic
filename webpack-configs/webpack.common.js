const fsExtra = require('fs-extra');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const createVariants = require('parallel-webpack').createVariants;

let outputPath = path.resolve(__dirname, '../dist');
let contextPath = path.resolve(__dirname, '..');

fsExtra.emptyDirSync(outputPath);

let bannerPath = require.resolve('es5-polyfill');
let banner = fs.readFileSync(bannerPath, {
  encoding: 'utf8'
});

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
                modules: false,
                spec: true,
                useBuiltIns: false
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
    new webpack.HashedModuleIdsPlugin(),
    new webpack.BannerPlugin({
      banner: banner,
      raw: true,
      entryOnly: true
    })
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