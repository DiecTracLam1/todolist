import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import BrandList from '../../container/Brand/BrandPage';
import MenuComponent from '~/views/component/Menu';
import TimeSheet from '~/views/container/TimeSheet';
import AddPage from '~/views/container/TimeSheet/AddPage';

const RootPage = ({searchParams, setSearchParams}) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MenuComponent searchParams={searchParams}/>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 12,
              height: '100%',
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  // <BrandList searchParams={searchParams} setSearchParams={setSearchParams} />
                  // <TimeSheet searchParams={searchParams} setSearchParams={setSearchParams} />
                  <AddPage />
                
                }
              />

              <Route path="/timesheet" element={<TimeSheet />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootPage;
