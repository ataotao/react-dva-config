import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import { Route, Switch, Redirect } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';

import { getMenuData } from '../../common/menu';
import NotFound from '../../routes/Exception/404';
import SiderMenu from '../../components/SiderMenu';
import styles from './index.less';

const { Header, Sider, Content } = Layout;

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
        isMobile,
        collapsed: false
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
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

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log('componentWillUpdate');
    }

    componentWillMount() {
        // console.log('componentWillMount');
    }

    componentDidMount() {
        // console.log('componentDidMount');
    }

    render() {
        const { routerData } = this.props;
        const clsSider = classNames(styles.sider);
        const layout = <Layout>
            {/* 侧边栏 */}
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} className={clsSider} breakpoint="lg"
                collapsedWidth="80" onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
                <div className="logo"> logo</div>
                <SiderMenu  {...this.props} menuData={getMenuData()}  collapsed={this.props.isMobile ? false : this.props.collapsed}/>
            </Sider>
            {/* 右侧布局 */}
            <Layout style={{ marginLeft: this.state.collapsed ? 80 : 200 }}>
                <Header className={styles.header}>
                    <Icon className={classNames(styles.trigger, 'cur')} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                </Header>
                <Content className={styles.content}>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect push to="/standardmodel/review" />} /> 
                        {routerData.map((item, index) => (
                            <Route path={item.path} exact component={item.component} key={index} />
                        ))}
                        <Route render={NotFound} />
                    </Switch>
                </Content>
            </Layout>
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