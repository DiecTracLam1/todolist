import { forwardRef, useImperativeHandle } from 'react';
import { Table } from 'antd';
import { columns } from './BrandColumn';
import { useDispatch } from 'react-redux';
import { deleBrandThunk, editBrandThunk, getDataThunk } from '~/features/brand/brandSlice';
import { getAllParams } from '~/ultis/getAllParams';

const ComponentTable = forwardRef(
  ({ TodoList, setOpenTable, setCurrentTodo, limit, offset, searchParams, loading }, ref) => {
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
      await dispatch(deleBrandThunk(id));
      await dispatch(getDataThunk(getAllParams(limit, offset, searchParams)));
    };

    const handleButtonDone = async (todo) => {
      const newTodo = { ...todo };
      newTodo.status = Number(!newTodo.status);
      await dispatch(editBrandThunk(newTodo));
    };

    const column = columns({ handleEdit, handleDetail, handleButtonDone, handleDelete, offset });

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
        dataSource={TodoList}
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
