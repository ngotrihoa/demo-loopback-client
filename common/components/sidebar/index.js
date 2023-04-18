import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import APP_ROUTER from '../../../constants/route';
import utils from '../../utils';
const { Header, Sider, Content } = Layout;

const SideBar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [tabActived, setTabActived] = useState(null);

  const flatRouter = useMemo(
    () =>
      utils.flattenByProp(APP_ROUTER, 'children').reduce((prev, curr) => {
        if (!prev.hasOwnProperty(prev[curr.key])) {
          prev[curr.key] = curr;
        }
        return prev;
      }, {}),
    [APP_ROUTER]
  );

  const router = useRouter();

  const handleChangeTab = (type) => {
    setTabActived((prev) => {
      if (prev === type) return prev;

      const path = flatRouter[type].path;
      if (path) router.push(path);

      return type;
    });
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(flatRouter)) {
      if (value?.path === router.pathname) {
        setTabActived(key);
        return;
      }
    }
  }, [router.pathname]);

  return (
    <Layout className="layout">
      <Sider collapsible onCollapse={(value) => setCollapsed(value)} collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[tabActived]}
          items={APP_ROUTER}
          onClick={(data) => handleChangeTab(data.key)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
          }}
        >
          {React.cloneElement(children, { onChangeTab: (type) => handleChangeTab(type) })}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
