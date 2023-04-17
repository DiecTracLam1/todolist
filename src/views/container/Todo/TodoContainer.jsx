import {  useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '~/assets/css/TodoList.css';
import { getDataThunk } from '~/features/todo/todoSlice';
import ComponentTable from './ComponentTable';
import ContainerPagingnation from './ContainerPagingnation';
import ContainerSelector from './ContainerSelector';
import SearchContainer from './SearchContainer';
import TodoTable from '../../presentation/Form/TodoForm';
import useCustomSearchParams from '~/useCustom/useCustomSearchParams';

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
const TodoContainer = ({ openTable, currentTodo, setCurrentTodo, setOpenTable }) => {
  const TodoList = useSelector((state) => state.todo.data.docs ?? []);
  const loading = useSelector((state) => state.todo.loading);
  const [searchParams, setSearchParams] = useCustomSearchParams();

  const searchLimit = useMemo(() => {
    return searchParams._limit > 20 ? 20 : searchParams._limit;
  }, [searchParams._limit]);

  const [limit, setLimit] = useState(searchLimit || 5);
  const [pageCount, setPageCount] = useState(
    !!(searchParams._page - 1) ? searchParams._page - 1 : 0
  );
  const offset = useMemo(() => Number(limit) * Number(pageCount), [limit, pageCount]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableRef = useRef();

  useLayoutEffect(() => {
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

  return (
    <Container>
      <SearchContainer
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setPageCount={setPageCount}
        table={tableRef}
      />

      <ContainerSelector
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        TodoList={TodoList}
      />

      <ContainerList>
        <ComponentTable
          TodoList={TodoList}
          setOpenTable={setOpenTable}
          setCurrentTodo={setCurrentTodo}
          ref={tableRef}
          limit={limit}
          offset={offset}
          searchParams={searchParams}
          loading={loading}
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

      {openTable !== '' && (
        <TodoTable
          setOpenTable={setOpenTable}
          openTable={openTable}
          currentTodo={currentTodo}
          searchParams={searchParams}
          limit={limit}
          setSearchParams={setSearchParams}
          setPageCount={setPageCount}
        />
      )}
    </Container>
  );
};

export default TodoContainer;
