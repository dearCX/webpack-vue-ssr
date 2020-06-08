const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Merge = require('webpack-merge')

const isDev = process.env.Node_ENV === 'development'

const BaseConfig = require('./webpack.config.base')

const defaultPlugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process-env': {
      NODE_ENV: isDev ? '"devlopment"' : '"production"'
    }
  }),
  new HtmlWebpackPlugin()
]

let config

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
}

if (isDev) {
  config = Merge(BaseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          // 正则表示是以.less文件结尾的
          test: /\.less$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'less-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = Merge(BaseConfig, {
    entry: {
      app: path.join(__dirname, '../client/main.js')
      // 可以插入多个类库
      // vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          // 正则表示是以.less文件结尾的
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'less-loader'
            ]
          })
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defaultPlugins.concat([
      new ExtractTextPlugin('styles.[md5:contentHash:hex:8].css')
      // 等同于optimization的配置
      // new webpack.optimize.SplitChunksPlugin({
      //   name: 'vendor'
      // }),
      // new webpack.optimize.RuntimeChunkPlugin({
      //   name: 'manifest'
      // })
    ])
  })
}

module.exports = config
