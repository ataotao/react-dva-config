import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import DynamicWrapper from './common/DynamicWrapper';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import style from './index.less';
import NotFound from './routes/Exception/404';
import Main from './routes/Main';
const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
    return <Spin size="large" className={style.globalSpin} />;
});

// function Auth(...args) {
//     console.log(args);
//     args[0].render(args[0]);
//     // debugger;
//     return <div></div>;
// }

function RouterConfig({ history, app }) {
    const routerData = DynamicWrapper(app);
    const UserLayout = routerData['user'];
    const ExceptionLayout = routerData['exception'];
    // const ModelLayout = routerData['model'];
    
    // const IndexPage = dynamic({
    //     app,
    //     component: () => import('./routes/IndexPage')
    // });
    return (
        <LocaleProvider locale={zhCN}>
            <ConnectedRouter history={history}>
                <Switch>
                    {/* <Auth
                        path="/"
                        render={props => {
                            console.log(props);
                            let User = UserLayout[0].component;
                            return UserLayout.map((item, index) => {
                                return <User {...props} />;
                                
                            });
                        }}
                        redirectPath="/user/login"
                    /> */}
                    {/* {ModelLayout.map((item, index) => (
                        <Route path={item.path} exact component={item.component} key={index} />
                    ))} */}
                    {UserLayout.map((item, index) => (
                        <Route path={item.path} exact component={item.component} key={index} />
                    ))}
                    {ExceptionLayout.map((item, index) => (
                        <Route path={item.path} exact component={item.component} key={index} />
                    ))}
                    {/* <Auth path="/" routerData={routerData} render={props => {
                        console.log(props);
                        return <Main {...props} />;
                    }}/> */}
                    {/* <Route path="/" component={Main} routerData={routerData} /> */}
                    <Route path="/" render={props => <Main {...props} routerData={routerData} />} />
                    <Route component={NotFound} />
                </Switch>
            </ConnectedRouter>
        </LocaleProvider>
    );
}
export default RouterConfig;
{/* return <UserLayout {...props} />; */}
/* <Route path="/user" component={UserLayout} />
<AuthorizedRoute
    path="/"
    render={props => <BasicLayout {...props} />}
    authority={['admin', 'user']}
    redirectPath="/user/login"
/> */
/* <Router history={history}>
    <Switch>
        <Route path={s[0].path} exact component={s[0].component} />
        <Route path={s[1].path} exact component={s[1].component} />
        <Route path="/" exact component={s[0]} />
        <Route path="/products" exact component={s[1]} />
        <Route path="/" exact component={IndexPage} />
        <Route path="/products" exact component={Products} />
        <Route path="/404" exact component={Exception403} />
        <Route path="/403" exact component={Exception404} />
        <Route path="/500" exact component={Exception500} />
    </Switch>
</Router> */
