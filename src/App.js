import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './views/container/Login/Login';
import TodoList from './views/container/Todo/TodoPage';
import useCustomSearchParams from '~/useCustom/useCustomSearchParams';

function App() {
  const [searchParams, setSearchParams] = useCustomSearchParams();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<TodoList searchParams={searchParams} setSearchParams={setSearchParams} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
