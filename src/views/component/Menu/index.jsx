import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Typography } from 'antd';
import React, { useState } from 'react';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Brand', '1'),
  getItem('Option 2', '2'),
  getItem('User', 'sub1'),
  getItem('Team', 'sub2'),
  getItem('Files', '9'),
];
const MenuComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider width={300} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Typography.Title
        level={2}
        style={{
          padding: '8px ',
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        Menu
      </Typography.Title>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  );
};

export default MenuComponent;
