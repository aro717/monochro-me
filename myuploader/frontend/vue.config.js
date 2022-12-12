// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        outputDir: '../static',
        assetsDir: '../static/myuploader',
        indexPath: '../templates/myuploader/index.html',
        publicPath: '/uploader/',
    }
}
