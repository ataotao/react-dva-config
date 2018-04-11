import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import DynamicWrapper from './common/DynamicWrapper';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import style from './index.less';
import NotFound from './routes/Exception/404';
const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
    return <Spin size="large" className={style.globalSpin} />;
});

function RouterConfig({ history, app }) {
    const routerData = DynamicWrapper(app);
    const ExceptionLayout = routerData['exception'];
    const MainLayout = routerData['layouts'][0].component;
    const UserLayout = routerData['layouts'][1].component;
    return (
        <LocaleProvider locale={zhCN}>
            <ConnectedRouter history={history}>
                <Switch>
                    {ExceptionLayout.map((item, index) => (
                        <Route path={item.path} exact component={item.component} key={index} />
                    ))}
                    <Route path="/user" render={props => <UserLayout {...props} routerData={routerData['user']} />} />
                    <Route path="/" render={props => <MainLayout {...props} routerData={routerData['main']} />} />
                    <Route component={NotFound} />
                </Switch>
            </ConnectedRouter>
        </LocaleProvider>
    );
}
export default RouterConfig;