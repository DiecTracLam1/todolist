import Layout from 'antd/es/layout/layout';
import { Route, Routes } from 'react-router-dom';
import useCustomSearchParams from '~/useCustom/useCustomSearchParams';
import LayoutComponent from '~/views/component/Layout/Layout';
import BrandList from '~/views/container/Brand/BrandPage';
import RootPage from '~/views/container/Page';
import TimeSheet from '~/views/container/TimeSheet';
import Detail from '~/views/container/TimeSheet/Detail';
import './App.css';
import Login from './views/container/Login/Login';
import Error from '~/views/container/Page/Error';

function App() {
  const [searchParams, setSearchParams] = useCustomSearchParams();

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<RootPage searchParams={searchParams} setSearchParams={setSearchParams} />}
          >
            <Route
              index
              element={
                <LayoutComponent>
                  <BrandList searchParams={searchParams} setSearchParams={setSearchParams} />
                </LayoutComponent>
              }
            />

            <Route
              path="brand"
              element={
                <LayoutComponent>
                  <BrandList searchParams={searchParams} setSearchParams={setSearchParams} />
                </LayoutComponent>
              }
            />
            <Route
              path="timesheet"
              element={
                <LayoutComponent>
                  <TimeSheet searchParams={searchParams} setSearchParams={setSearchParams} />
                </LayoutComponent>
              }
            />

            {['add', 'edit', 'detail'].map((path,index) => (
              <Route
                key={index}
                path={`timesheet/${path}`}
                element={
                  <LayoutComponent>
                    <Detail />
                  </LayoutComponent>
                }
              />
            ))}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
