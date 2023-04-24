import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './views/container/Login/Login';
import RootPage from '~/views/container/Page';
import useCustomSearchParams from '~/useCustom/useCustomSearchParams';
import Layout, { Content } from 'antd/es/layout/layout';
import TimeSheet from '~/views/container/TimeSheet';
import AddPage from '~/views/container/TimeSheet/AddPage';
import LayoutComponent from '~/views/component/Layout/Layout';
import BrandList from '~/views/container/Brand/BrandPage';

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
              path="/brand"
              element={
                <LayoutComponent>
                  <BrandList searchParams={searchParams} setSearchParams={setSearchParams} />
                </LayoutComponent>
              }
            />
            <Route
              path="/timesheet"
              element={
                <LayoutComponent>
                  <TimeSheet searchParams={searchParams} setSearchParams={setSearchParams} />
                </LayoutComponent>
              }
            />
            <Route
              path="/timesheet/*"
              element={
                <LayoutComponent>
                  <AddPage />
                </LayoutComponent>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
