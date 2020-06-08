module.exports = (isDev) => {
  return {
    // vue模版中的空格或者换行屏蔽
    preserveWhitepace: true,
    // vue模版内联样式打包到css文件中，生产环境需要，开发环境不需要
    extractCss: !isDev,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      // 样式名改成js识别的驼峰
      camelCase: true
    },
    // 对于vue组件的热重载关闭，开发环境
    // hotReload: false, // 根据环境变量生成
    // 用于配置自定义配置
    loaders: {},
    preloader: {},
    postloader: {}
  }
}