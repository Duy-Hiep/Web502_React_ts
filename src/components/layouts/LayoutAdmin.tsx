import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet,Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// const items: MenuItem[] = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];

const checkLogout = ()=>{
  localStorage.removeItem("user")
  alert("dang xuat ok")
  window.location.href="/"
}

const LayOutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark"  mode="inline" >
          <Menu.Item>
            <Link to={'/admin'} className='text-decoration-none'>Dashboard</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={'/admin/products'} className='text-decoration-none'>Product</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={'/admin/add'} className='text-decoration-none'>Product Add</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={'/admin/categories'} className='text-decoration-none'>Categories</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={'/admin/cateAdd'} className='text-decoration-none'>Category Add</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={'/products'} className='text-decoration-none'>Products client </Link>
          </Menu.Item>
          <Menu.Item>
            <Link onClick={checkLogout}  to={''} className='text-decoration-none'>Sign out</Link>
          </Menu.Item>
        
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} >
          <div className="ms-4 mt-2">
            <h3>Trang quan tri Admin</h3>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}

          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Outlet />
          </div>

        </Content>
        <Footer style={{ textAlign: 'center' }}>Nguyen Duy Hiep ©2023 PH20447 FPT Polytechnic</Footer>
      </Layout>
    </Layout>
  );
};

export default LayOutAdmin;