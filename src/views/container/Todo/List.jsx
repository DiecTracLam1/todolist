import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const List = () => {
  const TodoList = useSelector((state) => state.todo.data.docs);
  const dispatch = useDispatch()
  return (
    <>
      {TodoList.map((todo, index) => {
        return (
          <TodoItem
            // handleDetail={handleDetail}
            // setOpenDetail={setOpenDetail}
            // key={todo.id}
            // todo={todo}
            // handleDelete={handleDelete}
            // handleEdit={handleEdit}
            // index={index}
          />
        );
      })}
    </>
  );
};

export default List;
