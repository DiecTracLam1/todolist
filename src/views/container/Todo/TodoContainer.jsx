import { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '~/assets/css/TodoList.css';
import { columns } from '~/features/antd/tableColumn';
import { deleTodoThunk, editTodoThunk, getDataThunk } from '~/features/todo/todoSlice';
import { getAllParams } from '~/ultis/getAllParams';
import ComponentTable from './ComponentTable';
import ContainerPagingnation from './ContainerPagingnation';
import ContainerSelector from './ContainerSelector';
import SearchContainer from './SearchContainer';

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
  const tableRef = useRef();

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

  const column = columns({ handleEdit, handleDetail, handleButtonDone, handleDelete });

  useImperativeHandle(tableRef, () => ({
    getFilter() {
      return column.filter((coloumn) => coloumn.filterKey);
    },
    getDefaultSearch() {
      return column.find((coloumn) => coloumn.defaultSearch);
    },
  }));

  if (loading) return;

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
        TodoList={NewTodoList}

      />

      <ContainerList>
        <ComponentTable
          NewTodoList={NewTodoList}
          ref={tableRef}
          column={column}
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
