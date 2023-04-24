import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';

const LayoutComponent = (props) => {
  return (
    <Layout className="site-layout" style={{height:"100vh"}}>
      <Content style={{ margin: '0 16px' }}>
        <div
          style={{
            padding: 12,
            height: '100%',
          }}
        >
            {props.children}
        </div>
      </Content>
    </Layout>
  );
};

export default LayoutComponent;
