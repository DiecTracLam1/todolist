import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './views/container/Login/Login';
import TodoList from './views/container/Todo/TodoList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<TodoList/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
