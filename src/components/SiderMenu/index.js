import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
const { SubMenu, Item } = Menu;

// 转化路径
const conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
        return path;
    } else {
        return `/${path || ''}`.replace(/\/+/g, '/');
    }
};

// 获取子菜单
const getSubMenuItems = item => {
    return (
        <Item key={item.path}>
            <Link to={conversionPath(item.path)}>
                {!item.children && item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
            </Link>
        </Item>
    );
};

// 获取一级菜单
const getNavMenuItems = menusData => {
    if (!menusData) {
        return [];
    }

    return menusData.map(item => {
        return !item.children ? (
            getSubMenuItems(item)
        ) : (
            <SubMenu
                key={item.path}
                title={
                    <span>
                        <Icon type="mail" />
                        <span>{item.name}</span>
                    </span>
                }
            >   
                {item.children.map(sub => getSubMenuItems(sub) )}
            </SubMenu>
        );
    });
};

class SiderMenu extends Component {
    constructor(props) {
        super(props);
        this.menus = props.menuData;
        this.state = {
        };
    }

    // 初始化Menu默认选项
    setDefaultMenu = (pathname) => {
        const condition = pathname === '/';
        let defaultOpenKeys = condition ? ['/standardmodel'] : ['/' + pathname.split('/')[1]]; 
        let defaultSelectedKeys = condition ? ['/standardmodel/review'] : [pathname];
        return {
            defaultOpenKeys, defaultSelectedKeys
        };
    }
    render() {
        const props = this.props;
        const {defaultOpenKeys, defaultSelectedKeys} = this.setDefaultMenu(this.props.location.pathname);
        return (
            <Menu
                theme="dark"
                mode="inline"
                inlineCollapsed={props.collapsed}
                defaultOpenKeys={defaultOpenKeys}
                defaultSelectedKeys={defaultSelectedKeys}
            >
                {getNavMenuItems(this.menus)}
            </Menu>
        );
    }
}

export default SiderMenu;