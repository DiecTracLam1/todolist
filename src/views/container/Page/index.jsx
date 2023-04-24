import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import MenuComponent from '~/views/component/Menu';
import TimeSheet from '~/views/container/TimeSheet';

const RootPage = ({ searchParams, setSearchParams }) => {
  return (
    <>
      <MenuComponent searchParams={searchParams} />
      <Outlet />
    </>
    // <Layout className="site-layout">
    //   <Content style={{ margin: '0 16px' }}>
    //     <div
    //       style={{
    //         padding: 12,
    //         height: '100%',
    //       }}
    //     >
    //       <Routes>
    //         <Route
    //           path="/"
    //           element={
    //             // <BrandList searchParams={searchParams} setSearchParams={setSearchParams} />
    //             <TimeSheet searchParams={searchParams} setSearchParams={setSearchParams} />
    //             // <AddPage />

    //           }
    //         />

    //         <Route path="/timesheet" element={<TimeSheet />} />
    //       </Routes>
    //     </div>
    //   </Content>
    // </Layout>
  );
};

export default RootPage;
