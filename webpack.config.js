const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.Node_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process-env': {
        NODE_ENV : isDev ? '"devlopment"' : '"production"'
      }
    }),
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      {
        // 正则表示是以.vue文件结尾的
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // {
      //   // 正则表示是以.css文件结尾的，将转化为一段js代码，编译后插入html
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        // url-loader判断文件大小小于1024，将图片转化为base64直接写在js文件里面，小图片可减少http请求
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-.[ext]'
            }
          }
        ]
      },
    ]
  }
}

if(isDev){
  config.module.rules.push(
    {
      // 正则表示是以.less文件结尾的
      test: /\.less$/,
      use: [
        'style-loader',
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
  )
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    // 本地访问或者本机内网IP访问，别的的电脑也可以访问
    host: '0.0.0.0',
    // 任何错误显示在网页上
    overlay: {
      errors: true
    },
    // 启动项目自动打开浏览器
    // open: true,
    // 可以配置映射到同一个地址index.html
    // historyFallback: {},
    // 修改组件只渲染当前修改的代码
    hot: true
  },
  // 处理热加载更新的代码，直接更新修改的内容
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/main.js'),
    // 可以插入多个类库
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
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
  )
  config.plugins.push(
    new ExtractTextPlugin('styles.[md5:contentHash:hex:8].css'),
    new webpack.optimize.SplitChunksPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.RuntimeChunkPlugin({
      name: "manifest"
    })
    // new webpack.optimization.splitChunks({
    //   name: 'runtime'
    // })
  )
}

module.exports = config