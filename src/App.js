import './App.css';
import { BrowserRouter } from 'react-router-dom';
import TodoList from './Component/TodoList';
import { Provider } from 'react-redux';
import store from './app/store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <TodoList />
        </div>
      </BrowserRouter>
    </Provider> 
  );
}

export default App;
