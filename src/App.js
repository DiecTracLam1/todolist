import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Component/Login/Login';
import TodoList from './Component/Todo/TodoList';

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
