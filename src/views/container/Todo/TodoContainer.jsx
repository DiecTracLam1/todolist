import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '~/assets/css/TodoList.css';
import { deleTodoThunk, editTodoThunk, getDataThunk } from '~/features/todo/todoSlice';
import { getAllParams } from '~/ultis/getAllParams';
import ContainerPagingnation from './ContainerPagingnation';
import ContainerSelector from './ContainerSelector';
import SearchContainer from './SearchContainer';
import ComponentTable from './ComponentTable';

const Container = styled.div`
  background-color: lightgray;
  padding: 6px 14px;
  margin-top: 10px;
  border-radius: 6px;
`;
const ContainerList = styled.div`
  padding-right: 8px;
  margin-top: 18px;
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
  const TodoList = useSelector((state) => state.todo.data.docs ?? []);
  const loading = useSelector((state) => state.todo.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // const ReduxTable = connect(null,null,null, { forwardRef: true })(Table)

  const table = createRef();
  useEffect(() => {
    console.log(table.current);
  });
  // console.log(table.current);

  if (loading) return;

  return (
    <Container>
      <SearchContainer
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setPageCount={setPageCount}
        table={table.current}
      />

      <ContainerSelector
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        TodoList={NewTodoList}
      />

      <ContainerList>
        <ComponentTable
          NewTodoList={NewTodoList}
          handleEdit={handleEdit}
          handleDetail={handleDetail}
          handleButtonDone={handleButtonDone}
          handleDelete={handleDelete}
          ref={table}
        />
      </ContainerList>

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
