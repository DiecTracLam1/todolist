import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Component/Login/Login';
import TodoList from './Component/Todo/TodoList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/todolist' element={<TodoList/>}/>
      </Routes>
    </div>
  );
}

export default App;
