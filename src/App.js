
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import TodoList from './Component/TodoList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <TodoList/>
      </div>
    </BrowserRouter>
  );
}

export default App;
