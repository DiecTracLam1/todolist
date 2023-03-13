import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: {
    data: JSON.parse(localStorage?.getItem('todoList')) ?? [],
  },
  reducers: {
    add: (state, action) => {
      const { lastId, addText } = action.payload;
      const newTodo = [{ id: lastId + 1, content: addText ,done: false }, ...state.data];
      localStorage.setItem('todoList', JSON.stringify(newTodo));
      localStorage.setItem('lastID', JSON.stringify(lastId + 1));
      state.data = [...newTodo];
    },

    remove: (state, action) => {
      const id = action.payload;
      const newArray = state.data.filter((todo) => todo.id !== id);
      localStorage.setItem('todoList', JSON.stringify(newArray));
      state.data = [...newArray];
    },

    edit: (state, action) => {
      const { editTodo, oldIndex, newIndex } = action.payload;
      let tampTodo;
      let newArray = state.data.map((todo, i) => {
        tampTodo = { ...state.data[newIndex] };
        if (i === Number(newIndex)) {
          todo = { ...editTodo };
        } else if (i === Number(oldIndex)) {
          todo = { ...tampTodo };
        }
        return todo;
      });
      localStorage.setItem('todoList', JSON.stringify(newArray));
      state.data = [...newArray];
    },

    done : (state, action) => {
      const id = action.payload
      const index = state.data.findIndex(todo => todo.id === id)
      state.data[index].done = !state.data[index].done
      localStorage.setItem('todoList', JSON.stringify(state.data));

    }
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, edit , done } = todoSlice.actions;

export default todoSlice.reducer;
