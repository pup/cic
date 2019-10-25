// https://www.npmjs.com/package/cross-env
// https://www.npmjs.com/package/clean-webpack-plugin
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const merge = require('webpack-merge');
const createVariants = require('parallel-webpack')
  .createVariants;

// console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
// console.log('distPath = ' + path.resolve(__dirname, 'dist'));
// console.log('fs.realpathSync(process.cwd()) = ' + fs.realpathSync(process.cwd()));

let rootConfig = {
  context: path.resolve(__dirname, '..'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    globalObject: 'this',
    libraryTarget: 'umd'
  },
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ['@babel/preset-env', {
                "modules": false
              }]
              // ['@babel/preset-env', {
              //   targets: {
              //     "chrome": "50",
              //     "ie": "9"
              //   },
              //   useBuiltIns: 'usage',
              //   corejs: 2
              // }]
            ],
            plugins: [
              ["@babel/plugin-proposal-class-properties", {
                "loose": true
              }],
              "add-module-exports"
            ]
          },
        }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // failOnError: true,
          // emitWarning: true,a
          emitError: true
        }
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ]
};


function createVariantsCallback({
  baseInfo,
  envVariants
}, idx) {
  return merge.smart(rootConfig, {
    entry: baseInfo.entry,
    output: {
      library: baseInfo.library,
      filename: baseInfo.filename + (envVariants.optimization.minimize ?
        '.min.js' : '.js')
    }
  }, envVariants);
}

const variants = {
  baseInfo: [{
    entry: './cic-outside-iframe/index.js',
    library: 'CicOutsideIframe',
    filename: 'cic-outside-iframe'
  }, {
    entry: './cic-inside-iframe/index.js',
    library: 'CicInsideIframe',
    filename: 'cic-inside-iframe'
  }]
};

const generateConfigs = function(envVariants) {
  return createVariants(Object.assign({}, variants, {
    envVariants
  }), createVariantsCallback);
};

module.exports = {
  generateConfigs
}