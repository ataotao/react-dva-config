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
    },

    theme: {
        '@primary-color': '#1DA57A'
    }
};
