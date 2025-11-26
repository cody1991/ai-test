import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  CalendarOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: '/menu',
      icon: <AppstoreOutlined />,
      label: '菜单管理',
    },
    {
      key: '/orders',
      icon: <ShoppingCartOutlined />,
      label: '订单管理',
    },
    {
      key: '/reservations',
      icon: <CalendarOutlined />,
      label: '预订管理',
    },
    {
      key: '/inventory',
      icon: <InboxOutlined />,
      label: '库存管理',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: 32,
            margin: 16,
            color: '#fff',
            fontSize: collapsed ? 14 : 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {collapsed ? '🍕' : '🍕 意式餐厅'}
        </div>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', fontSize: 20, fontWeight: 'bold' }}>
          意大利餐厅管理系统
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
