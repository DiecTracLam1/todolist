import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '~/assets/css/TodoList.css';
import { getDataThunk } from '~/features/brand/brandSlice';
import ComponentTable from './BrandList';
import ContainerPagingnation from '~/views/component/Pagingnation/ContainerPagingnation';
import ContainerSelector from '../../component/Selector/ContainerSelector';
import SearchContainer from '../../component/Search/SearchContainer';
import TodoTable from '../../presentation/Form/Brand/BrandForm';
import { getAllParams } from '~/ultis/getAllParams';

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
  openTable,
  currentTodo,
  setCurrentTodo,
  setOpenTable,
  searchParams,
  setSearchParams,
}) => {
  const TodoList = useSelector((state) => state.todo.data.docs ?? []);
  const loading = useSelector((state) => state.todo.loading);

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
      const result = await dispatch(getDataThunk(getAllParams(limit, offset, searchParams)));
      if (!!result.payload?.errorCode) {
        localStorage.removeItem('user_token');
        navigate('/login');
      }
    };
    getApi();
  }, [dispatch, limit, offset, navigate, searchParams]);

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
