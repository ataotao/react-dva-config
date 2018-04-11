import dynamic from 'dva/dynamic';

// layouts布局
const layouts = [
    {
        name: 'main',
        path: '/',
        component: () => import('../layouts/MainLayouts'),
        models: () => [import('../models/main')]
    },
    {
        name: 'user',
        path: '/user',
        component: () => import('../layouts/UserLayouts'),
        models: () => [import('../models/user')]
    }
];

// 用户
const user = [
    {
        name: '登录',
        path: '/user/login',
        component: () => import('../routes/User/Login'),
        models: () => [import('../models/login')]
    }
];

// 标准车型审核
const main = [
    {
        name: '标准车型',
        path: '/standardmodel/review',
        component: () => import('../routes/Standardmodel/Review'),
        models: () => [import('../models/review')]
    },
    {
        name: '批量任务',
        path: '/standardmodel/batchtask',
        component: () => import('../routes/Standardmodel/Batchtask'),
        models: () => [import('../models/batchtask')]
    }
];
// 其他状态
const exception = [
    {
        name: '403',
        path: '/exception/403',
        component: () => import('../routes/Exception/403')
    },
    {
        name: '404',
        path: '/exception/404',
        component: () => import('../routes/Exception/404')
    },
    {
        name: '500',
        path: '/exception/500',
        component: () => import('../routes/Exception/500')
    }
];

const routesData = { layouts, user, main, exception };

// 动态导入路由文件
const DynamicWrapper = app => {
    let res = {};
    for (const k in routesData) {
        res[k] = routesData[k].map(({ name, path, models, component }) => ({
            name,
            path,
            component: dynamic({ app, models, component })
        }));
    }
    return res;
};

export default DynamicWrapper;