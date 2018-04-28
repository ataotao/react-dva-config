import React, { Component } from 'react';
import { Icon, Breadcrumb } from 'antd';
import styles from './index.less';
import { rawMenu } from '../../common/menu';

const MainBreadcrumb = props => {
    const { breadcrumbData } = props;
    return (
        <div className={styles.pageBreadcrumb}>
            <Breadcrumb>
                {
                    breadcrumbData.map((item, index) => {
                        return (
                            <Breadcrumb.Item key={item.name}>
                                {item.path === '/' && <Icon type="home" />} <span>{item.name}</span>
                            </Breadcrumb.Item>
                        );
                    })
                }
            </Breadcrumb>
        </div>
    );
};

let breadcrumbData = [];

class MainHeaderLayout extends Component {

    // 构造面包屑数据
    getBreadcrumbData = (rawMenu, pathname) => {
        const { location } = this.props;
        let pathnameArr = location.pathname.split('/');
        if(pathname) {
            breadcrumbData = [{path:'/', name:'首页'}];
        }
        for (let i = 0; i < rawMenu.length; i++) {
            const { path, name, children } = rawMenu[i];
            for (let j = 0; j < pathnameArr.length; j++) {
                const pathStr = pathnameArr[j];
                if (pathStr == path) {
                    let pathRes = pathnameArr[j - 1]
                        ? '/' + pathnameArr[j - 1] + '/' + path
                        : '/' + path;
                    breadcrumbData.push({ path: pathRes, name });
                    if (children) {
                        this.getBreadcrumbData(children);
                    }
                    break;
                }
            }
        }
    };

    render() {
        const { children, location } = this.props;
        // 构造面包屑数据
        this.getBreadcrumbData(rawMenu, location.pathname);
        const pageTitle = breadcrumbData[breadcrumbData.length - 1].name;
        return (
            <div>
                <div className={styles.pageHeader}>
                    {/* 面包屑 */}
                    <MainBreadcrumb location={location} breadcrumbData={breadcrumbData} />
                    {/* 面包屑标题 */}
                    <h3 className={styles.pageTitle}>{pageTitle}</h3>
                </div>
                {children ? (
                    <div className={styles.content}>{children}</div>
                ) : null}
            </div>
        );
    }
}


export default MainHeaderLayout;