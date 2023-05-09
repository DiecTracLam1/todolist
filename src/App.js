import { Route, Routes } from 'react-router-dom';
import useCustomSearchParams from '~/useCustom/useCustomSearchParams';
import BrandList from '~/views/container/Brand/BrandPage';
import MainPage from '~/views/container/Page';
import TimeSheet from '~/views/container/TimeSheet';
import Detail from '~/views/container/TimeSheet/Detail';
import './App.css';
import Login from './views/container/Login/Login';
import Error from '~/views/container/Page/Error';

function App() {
  const [searchParams, setSearchParams] = useCustomSearchParams();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage searchParams={searchParams} />}>
          <Route
            index
            element={<BrandList searchParams={searchParams} setSearchParams={setSearchParams} />}
          />

          <Route
            path="brand"
            element={<BrandList searchParams={searchParams} setSearchParams={setSearchParams} />}
          />
          <Route
            path="timesheet"
            element={<TimeSheet searchParams={searchParams} setSearchParams={setSearchParams} />}
          />

          {['add', 'edit/:timesheetId', 'detail/:timesheetId'].map((path, index) => (
            <Route key={index} path={`timesheet/${path}`} element={<Detail />} />
          ))}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
