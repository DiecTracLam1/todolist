import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MenuComponent from '~/views/component/Menu';

const MainPage = ({ searchParams  }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user_token')) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <Layout>
      <MenuComponent searchParams={searchParams} />
      <Layout className="site-layout" style={{ height: '100vh' }}>
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 12,
              height: '100%',
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPage;
