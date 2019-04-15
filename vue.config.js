const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
// const serveUrl = 'http://www.lovepean.xyz:3000';
const serveUrl = 'http://localhost:3000';

module.exports = {
    outputDir: 'web',
    // publicPath: '/web/', // 部署应用包时的基本 URL。
    chainWebpack: config => {
        // 修改svg loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end();

        // 添加svg-sprite-loader
        config.module
            .rule('svgSpriteLoader')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();
    },
    devServer: {
        proxy: {
            '/api': {
                target: serveUrl,
                changeOrigin: true,
                // pathRewrite:{
                //     '^/api': '/api'
                // }
            },
            '/images': {
                target: serveUrl,
                changeOrigin: true,
            },
            '/avators': {
                target: serveUrl,
                changeOrigin: true
            },
            '/files': {
                target: serveUrl,
                changeOrigin: true
            }
        }
    }
}