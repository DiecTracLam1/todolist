import React, { useEffect, useMemo, useRef } from 'react';
import SearchContainer from './SearchContainer';
import List from './List';
import ContainerPagingnation from './ContainerPagingnation';
import styled from 'styled-components';
import ContainerSelector from './ContainerSelector';
import { useDispatch, useSelector } from 'react-redux';
import { deleTodoThunk, editTodoThunk, getDataThunk } from '~/features/todo/todoSlice';
import { getAllParams } from '~/ultis/getAllParams';
import { columns } from '~/features/antd/tableColumn';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background-color: lightgray;
  padding: 6px 14px;
  margin-top: 10px;
  border-radius: 6px;
`;
const TodoContainer = ({
  setCurrentTodo,
  setOpenTable,
  searchParams,
  setSearchParams,
  setPageCount,
  limit,
  pageCount,
  setLimit,
}) => {
  const dispatch = useDispatch();
  const TodoList = useSelector((state) => state.todo.data.docs ?? []);

  const offset = useMemo(() => Number(limit) * Number(pageCount), [limit, pageCount]);
  const NewTodoList = useMemo(
    () =>
      TodoList.map((todo, i) => {
        return {
          num: i + 1 + offset,
          ...todo,
          createdAt: new Date(todo.createdAt).toLocaleDateString(),
        };
      }),
    [TodoList, offset]
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getApi = async () => {
      const result = await dispatch(
        getDataThunk({
          limit,
          offset,
          searchText: [
            { value: searchParams.name, key: 'name' },
            { value: searchParams.id, key: 'id' },
            { value: searchParams.fullName, key: 'BrandEmployeeCreate.fullName' },
            { value: searchParams.createdAt, key: 'createdAt' },
          ],
        })
      );
      if (!!result.payload?.errorCode) {
        localStorage.removeItem('user_token');
        navigate('/login');
      }
    };
    getApi();
  }, [
    dispatch,
    limit,
    offset,
    navigate,
    searchParams?.name,
    searchParams.id,
    searchParams.fullName,
    searchParams.createdAt,
  ]);
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

  const table = useRef(null);
  const column = columns({ handleEdit, handleDetail, handleButtonDone, handleDelete });
  return (
    <Container>
      <SearchContainer
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setPageCount={setPageCount}
        columns = {columns}
      />

      {/* <ContainerSelector /> */}
      {/* 
      <List
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        limit={limit}
        handleDetail={handleDetail}
        handleEdit={handleEdit}
        setPageCount={setPageCount}
        pageCount={pageCount}
      /> */}

      <Table
        rowKey="id"
        columns={column}
        dataSource={NewTodoList}
        pagination={false}
        scroll={{ x: true, y: '420px' }}
        bordered
        ref={table => console.log(table)}
      />

      <ContainerPagingnation
        pageCount={pageCount}
        limit={limit}
        setLimit={setLimit}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setPageCount={setPageCount}
      />
    </Container>
  );
};

export default TodoContainer;
