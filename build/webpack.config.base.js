const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')
const isDev = process.env.Node_ENV === 'development'

const config = {
  mode: process.env.Node_ENV || 'production',
  target: 'web',
  entry: path.join(__dirname, '../client/main.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        // 正则表示是以.vue文件结尾的
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        // 预处理代码检查
        enforce: 'pre'
      },
      {
        // 正则表示是以.vue文件结尾的
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        // url-loader判断文件大小小于1024，将图片转化为base64直接写在js文件里面，小图片可减少http请求
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
