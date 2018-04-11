export default {
    extraBabelPlugins: [
        [
            'import',
            { libraryName: 'antd', libraryDirectory: 'es', style: true } // 注意，如果修改默认主题配置，style: 'css'，需要改变为style:true
        ]
    ],

    proxy: {
        '/api': {
            target: 'https://dev.q.sopei.cn',
            changeOrigin: true,
            pathRewrite: { '^/api': '/api' }
        }
        // '/api/user': {
        //     target: 'https://dev.q.sopei.cn',
        //     changeOrigin: true,
        //     pathRewrite: { '^/api/user': '/api/user' }
        // }
    },

    theme: {
        // '@primary-color': '#1DA57A'
    }
};
