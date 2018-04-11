import dynamic from 'dva/dynamic';

// 用户
let user = [
    {
        name: '登录',
        path: '/user/login',
        component: () => import('../routes/User/Login'),
        models: () => [import('../models/login')]
    }
];

// 标准车型审核
let main = [
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
let exception = [
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

let routesData = { user, main, exception };

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

// let configs = [
//     {
//         path: '/',
//         component: () => import('../routes/IndexPage'),
//         models: []
//     },
//     {
//         path: '/products',
//         component: () => import('../routes/Products'),
//         models: () => [import('../models/products')]
//     },
//     // {
//     //     path: '/user/login',
//     //     component: () => import('./Login')
//     // }
// ];

// const configInit = app => {
//     return (component, models) => {
//         let obj = {
//             app,
//             component: () => arr[0]
//         };
//         if (models) {
//             obj.models = () => [import(models)];
//         }
//         return dynamic(obj);
//     };
// };

// const DynamicWrapper = (app) => {
//     let config = configInit(app);
//     const IndexPage = config('IndexPage');
//     components.forEach(component => {
//         config('IndexPage')
//     });
//     // const Products = dynamic({
//     //     app,
//     //     models: () => [import('./models/products')],
//     //     component: () => import('./routes/Products')
//     // });
//     // const Exception403 = dynamic({
//     //     app,
//     //     component: () => import('./routes/Exception/403')
//     // });
//     // const Exception404 = dynamic({
//     //     app,
//     //     component: () => import('./routes/Exception/404')
//     // });
//     // const Exception500 = dynamic({
//     //     app,
//     //     component: () => import('./routes/Exception/500')
//     // });

//     return {IndexPage};
// };
