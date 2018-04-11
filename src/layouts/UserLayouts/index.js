import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';

import NotFound from '../../routes/Exception/404';
// import styles from './index.less';

const { Content } = Layout;

let isMobile;
enquireScreen(b => {
    isMobile = b;
});

const query = {
    'screen-xs': {
        maxWidth: 575
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199
    },
    'screen-xl': {
        minWidth: 1200
    }
};

class Main extends Component {
    state = {
        isMobile
    };

    getPageTitle() {
        const { routerData, location } = this.props;
        const { pathname } = location;
        let title = '搜配 - 审核后台';
        for (let i = 0; i < routerData.length; i++) {
            if(routerData[i].path == pathname){
                title = `${routerData[i].name} - 搜配`;
                break;
            }
        }
        return title;
    }

    render() {
        const { routerData } = this.props;
        const layout = <Layout>
            <Content>
                <Switch>
                    <Route exact path="/user" render={() => <Redirect push to="/user/login" />} /> 
                    {routerData.map((item, index) => (
                        <Route path={item.path} exact component={item.component} key={index} />
                    ))}
                    <Route render={NotFound} />
                </Switch>
            </Content>
        </Layout>;
        return (
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                    {params =>(
                        <div className={classNames(params)}>{layout}</div>
                    )}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}

export default Main;