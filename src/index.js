import dva from 'dva';
import Router from './router';
import './index.less';

import { message } from 'antd';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';

import GlobalModel from './models/global';
const models = [GlobalModel];

// 全局错误处理
const onError = (err, dispatch) => {
    message.error(err.message, /* duration */ 3);
};

// state 改变时触发，可用于同步 state 到 localStorage，服务器端等。
const onStateChange = state => {
    // console.log(state);
};

// 1. Initialize
let initialState = {}; // 可定义一些初始化数据
let initConfig = { onError, onStateChange, initialState, onAction: [] };
if (process.env.NODE_ENV !== 'production') {
    initConfig.onAction.push(createLogger({collapsed: true}));
}
const app = dva(initConfig);

// 2. Plugins
app.use(createLoading());

// 3. Model
models.forEach(m => app.model(m));

// 4. Router
app.router(Router);

// 5. Start
app.start('#root');

export default app;
