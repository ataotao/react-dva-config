### Created by Atao on 2018/4/12.

## 框架组成
- `dva` [数据 + 状态管理redux + 路由 + 工具] (dva底层引入了redux-sagas做异步流程控制)
- `antd` (或mobile)[UI视图]
- UI文档
    - pc[https://ant.design/index-cn]
    - mobile[https://mobile.ant.design/index-cn]
    - UI风格可参考 antd pro [https://preview.pro.ant.design](没有采用此框架，使用自定义的dev配置更灵活)

## 文件说明
- /public 可放置静态资源文件 (如/public/static/img/nopic.png，页面可直接引用<img src="static/img/nopic.png" alt="" />)
- /assets 可导入的资源文件
- /layouts 父级路由布局
- /routes 路由页面组件
- /components 控件组件
- /common 通用配置
- /models 数据模型
- /services http封装以及api接口
- /utils  通用工具
- /index.js 入口文件
- /router.js 顶级路由配置
- /index.css 全局样式配置
- /mock 模拟接口
- 其他配置文件
    - .eslintrc 自定义eslint校验规则
    - .webpackrc.js 可覆盖webpack配置
    - .roadhogrc.mock mock接口配置
    - .editorconfig 编辑器规则配置

### babel-plugin-import 是用来按需加载 antd 的脚本和样式
```
    npm install babel-plugin-import --save-dev
    // 编辑 .webpackrc，使 babel-plugin-import 插件生效。
    {
      "extraBabelPlugins": [
            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
            // 注意，如果修改默认主题配置，style: 'css'，需要改变为style:true
            // 意思就是引入less的源文件进行修改，而不是引入css文件
        ]
    }
```

### 开发环境配置代理
```
    proxy: {
        '/api': {
            target: 'https://api.test.cn/',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        }
    }
```

### model简单说明
- namespace : model 的命名空间，同时也是他在全局 state 上的属性，只能用字符串，不支持通过 . 的方式创建多层命名空间。
- state: 初始值，优先级低于传给 dva() 的 opts.initialState。
```
    // 比如
    const app = dva({
    initialState: { count: 1 },
    });
    app.model({
    namespace: 'count',
    state: 0,
    });
```
- reducers: 以 key/value 格式定义 reducer。用于处理同步操作，唯一可以修改 state 的地方。由 action 触发。
```
    // 格式为 
    (state, action) => newState 
```
- effects: 以 key/value 格式定义 effect。用于处理异步操作和业务逻辑，不直接修改 state。由 action 触发，可以触发 action，可以和服务器交互，可以获取全局 state 的数据等等。，通常是通过effects操作异步请求，数据修改提交给reducers处理
```
    // 格式为
    *(action, effects) => void
    // 注意effects 是通过 generator 组织的。Generator 返回的是迭代器，通过 yield 关键字实现暂停功能。
    effects: {
    *addRemote({ payload: todo }, { put, call }) {
            yield call(service.addTodoFn, todo); // 先执行
            yield put({ type: 'add', payload: todo }); // 再执行
        }
    },
```
- subscriptions: 以 key/value 格式定义 subscription。subscription 是订阅，用于订阅一个数据源，然后根据需要 dispatch 相应的 action。在 app.start() 时被执行，数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。(通常大部分时间是处理history路由时的一些初始化处理)
```
    subscriptions: {
        setup({ history, dispatch }) {
            // 监听 history 变化，当进入 `/` 时触发 `load` action
            return history.listen(({ pathname }) => {
                if (pathname === '/') {
                    dispatch({ type: 'load' });
                }
            });
        }
    }
```
### 尽量声明 propTypes 对 props 进行校验，以减少不必要的问题
- 内置的 prop type 有：
    - PropTypes.array
    - PropTypes.bool
    - PropTypes.func
    - PropTypes.number
    - PropTypes.object
    - PropTypes.string
```
// 例子
function App(props) {
  return <div>{props.name}</div>;
}
App.propTypes = {
  name: React.PropTypes.string.isRequired,
};
```

### 配置antd主题 theme
- .webpackrc（JSON 格式）或 .webpackrc.js（ES 6 语法）中配置
```
    "theme": {
    "@primary-color": "#1DA57A"
    }
    // 或者，
    "theme": "./theme-config.js"
    // 注意，如果修改默认主题配置，style: 'css'，需要改变为style:true
```

### 使用异步路由加载组件, 通过（dva/dynamic）实现
```
    // 例子
    import React from 'react';
    import dynamic from 'dva/dynamic';
    import { Router, Route, Switch } from 'dva/router';


    function RouterConfig({ history, app }) {
        const IndexPage = dynamic({
            app,
            component: () => import('./routes/IndexPage')
        });
        const Products = dynamic({
            app,
            models: () => [import('./models/products')],  // 注意： models返回的是一个数组
            component: () => import('./routes/Products')
        });
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={IndexPage} />
                    <Route path="/products" exact component={Products} />
                </Switch>
            </Router>
        );
    }
    export default RouterConfig;

```

### Redux connect参数
```
    connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```

## eslint验证(没有加入build时的验证，只是编写代码时验证)
```
    // 某些文件关闭eslint检查
    /*eslint-disable*/
    function test() {
    return true
    }
    // 给某一行js代码关闭eslint检查
    // eslint-disable-next-line
    alert('foo')
```

### 基于 action 进行页面跳转
- 除 push(location) 外还有更多方法，详见这里[https://github.com/reactjs/react-router-redux#pushlocation-replacelocation-gonumber-goback-goforward]
```
    import { routerRedux } from 'dva/router';

    // Inside Effects
    yield put(routerRedux.push('/logout'));

    // Outside Effects
    dispatch(routerRedux.push('/logout'));

    // With query
    routerRedux.push({
    pathname: '/logout',
    query: {
        page: 2,
    },
    });
```