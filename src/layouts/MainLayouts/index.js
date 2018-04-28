import React, { Component } from 'react';
import { connect } from 'dva';
import { Route, Switch, Redirect } from 'dva/router';
import { Layout, Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';
import { ContainerQuery } from 'react-container-query';
import { getMenuData } from '../../common/menu';
import NotFound from '../../routes/Exception/404';
import SiderMenu from '../../components/SiderMenu';
import MainHeaderLayout from '..//MainHeaderLayout';
import classNames from 'classnames';
import styles from './index.less';

const { Header, Content } = Layout;

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
        enquireScreen(mobile => {
            this.setState({
                isMobile: mobile,
            });
        });
    }

    getPageTitle = ()=> {
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
    };

    handleMenuCollapse = collapsed => {
        this.props.dispatch({
            type: 'main/changeMainLayoutCollapsed',
            payload: collapsed,
        });
    };

    render() {
        const { routerData, collapsed, location } = this.props;
        const { isMobile } = this.state;
        let LayoutStyle = !isMobile ? {'marginLeft': collapsed ? 80 : 200} : {};
        const layout = <Layout>
            {/* 侧边栏 */}
            <SiderMenu menuData={getMenuData()} collapsed={collapsed} location={location} isMobile={isMobile} onCollapse={this.handleMenuCollapse}/>
            {/* 右侧布局 */}
            <Layout style={LayoutStyle}>
                {/* Header */}
                <Header className={styles.header}>
                    {isMobile && 
                    <span>
                        <span className={classNames(styles['header_logo'], 'iconfont icon-lingxing')}></span>
                        <span className={styles.divider}></span>
                    </span>
                    }
                    
                    <Icon className={classNames(styles.trigger, 'cur')} type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={()=>this.handleMenuCollapse(!collapsed)} />
                </Header>
                <MainHeaderLayout location={location}>
                    {/* Content */}
                    <Content className={styles.content}>
                        <Switch>
                            <Route exact path="/" render={() => <Redirect push to="/user/login" />} />
                            {routerData.map((item, index) => (
                                <Route path={item.path} exact component={item.component} key={index} />
                            ))}
                            <Route render={NotFound} />
                        </Switch>
                    </Content>
                </MainHeaderLayout>

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

const mapStateToProps = ({ main }) => ({ collapsed: main.collapsed });
export default connect(mapStateToProps)(Main);