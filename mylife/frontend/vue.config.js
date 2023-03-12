module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/prepends.scss";'
      }
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    outputDir: '../static',
    assetsDir: '../static/mylife',
    indexPath: '../templates/mylife/index.html',
    publicPath: '/life/',
    css: {
      loaderOptions: {
        scss: {
          additionalData: '@import "./src/assets/scss/prepends.scss";'
        }
      }
    }
  }
}
