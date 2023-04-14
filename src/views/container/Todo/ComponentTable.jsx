import { forwardRef, useImperativeHandle } from 'react';
import { Table } from 'antd';
import { columns } from '~/features/antd/tableColumn';
import { useDispatch } from 'react-redux';
import { deleTodoThunk, editTodoThunk, getDataThunk } from '~/features/todo/todoSlice';
import { getAllParams } from '~/ultis/getAllParams';

const ComponentTable = forwardRef(
  ({ NewTodoList, setOpenTable, setCurrentTodo, limit, offset, searchParams , loading }, ref) => {
    
    const dispatch = useDispatch();

    const handleDetail = (todo) => {
      setCurrentTodo(todo);
      setOpenTable('Detail');
    };

    const handleEdit = (todo) => {
      setCurrentTodo(todo);
      setOpenTable('Edit');
    };

    const handleDelete = async (id) => {
      await dispatch(deleTodoThunk(id));
      await dispatch(getDataThunk(getAllParams(limit, offset, searchParams)));
    };

    const handleButtonDone = async (todo) => {
      const newTodo = { ...todo };
      newTodo.status = Number(!newTodo.status);
      await dispatch(editTodoThunk(newTodo));
    };

    const column = columns({ handleEdit, handleDetail, handleButtonDone, handleDelete });

    useImperativeHandle(
      ref,
      () => ({
        getFilter() {
          return column.filter((coloumn) => coloumn.filterKey);
        },
        getDefaultSearch() {
          return column.find((coloumn) => coloumn.defaultSearch);
        },
      }),
      [column]
    );

    return (
      <Table
        rowKey="id"
        columns={column}
        dataSource={NewTodoList}
        pagination={false}
        scroll={{ x: true, y: '420px' }}
        bordered
        ref={ref}
        loading={loading}
      />
    );
  }
);

export default ComponentTable;
