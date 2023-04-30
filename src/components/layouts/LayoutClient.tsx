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
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';


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

const LayOutClient: React.FC = () => {
  const navigate = useNavigate()
  const checkLogout = ()=>{
    localStorage.removeItem("user")
    alert("dang xuat ok")
    window.location.href="/"
  }
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} >
          <p>Nguyen Duy Hiep 20447</p>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
          <Menu.Item>
            <Link to={'/'} className='text-decoration-none'>SigNin</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={'/signup'} className='text-decoration-none'>SigNup</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={'/admin'} className='text-decoration-none'>Admin</Link>
          </Menu.Item>
          <Menu.Item>
            <Link onClick={checkLogout}  to={''} className='text-decoration-none'>Sign out</Link>
          </Menu.Item>
        </Menu>
        

      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} >
          <div className='ms-4 mt-2 text-wrap fst-italic text-center '>
            <h3 className=''>Xin chao ban da den voi Product Page</h3>
            
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
        <Carousel autoplay >
          <div>
            <img src="https://png.pngtree.com/background/20210710/original/pngtree-new-mobile-phone-promotion-season-carnival-purple-banner-picture-image_1042510.jpg" alt="" width='100%' height='100%'/>
          </div>

          <div>
            <img src="https://png.pngtree.com/background/20210710/original/pngtree-cool-new-mobile-phone-promotion-purple-banner-picture-image_1006678.jpg" alt=""  width='100%' height='100%'/>
          </div>

          <div>
            <img src="https://png.pngtree.com/background/20210709/original/pngtree-blockchain-big-data-mobile-phone-technology-picture-image_920097.jpg" alt=""  width='100%' height='100%'/>
          </div>
        </Carousel>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default LayOutClient;
