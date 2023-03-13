import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: {
    data: JSON.parse(localStorage?.getItem('todoList')) ?? [],
  },
  reducers: {
    add: (state, action) => {
      const { lastId, addText } = action.payload;
      const newTodo = [{ id: lastId + 1, content: addText }, ...state.data];
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
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, edit } = todoSlice.actions;

export default todoSlice.reducer;
