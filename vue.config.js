const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
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
                target: 'http://localhost:3000',
                changeOrigin: true,
                // pathRewrite:{
                //     '^/api': '/api'
                // }
            },
            '/images': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
            '/avators': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
}