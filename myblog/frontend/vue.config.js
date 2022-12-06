if (process.env.NODE_ENV === 'production') {
    module.exports = {
        outputDir: '../static',
        assetsDir: '../static/myblog',
        indexPath: '../templates/myblog/index.html',
        publicPath: '/blog/',
    }
}
