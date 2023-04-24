import { Menu, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function getItem(label, key, path) {
  return {
    key,
    path,
    label: <NavLink to={path}>{label}</NavLink>,
  };
}
const items = [getItem('Brand', '1', '/brand'), getItem('TimeSheet', '2', '/timesheet')];
const MenuComponent = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const selectedItem = useMemo(
    () => items.find((item) => item.path === location.pathname),
    [location.pathname]
  );
  
  return (
    <Sider
      width={260}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedItem?.key ?? "1"]} items={items}/>
    </Sider>
  );
};

export default MenuComponent;
