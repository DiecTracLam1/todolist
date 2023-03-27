import React, { useEffect, useMemo, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { TiTimes } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleTodoThunk, editTodoThunk, getDataThunk } from '../../../features/todo/todoSlice';
import { logout } from '../../../features/user/userSlice';
import useCustomSearchParams from '../../../useCustom/useCustomSearchParams';
import AddTable from './AddTable';
import Detail from './Detail';
import EditTable from './EditTable';
import ErrorLog from './ErrorLog';
import PaginatedItems from './Pagingnation';
import TodoItem from './TodoItem';

const Container = styled.div`
  width: 700px;
  margin: auto;
`;
const ContainerHeader = styled.div`
  position: relative;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  background-color: #685e5e;
  color: white;
`;

const ContainerHeaderButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;
const ButtonHeader = styled.button`
  padding: 4px 8px;
  text-transform: uppercase;
  margin: 0 6px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  max-height: 26px;
`;

const ButtonAdd = styled(ButtonHeader)`
  background-color: rgb(13, 189, 13);
  color: white;
`;

const ButtonLogOut = styled(ButtonHeader)`
  &:hover {
    background-color: red;
    color: white;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  margin: 8px 0;
`;
const InputContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
`;
const Input = styled.input`
  padding: 8px;
  border: none;
  outline: none;
  flex: 1;
`;

const Times = styled.div`
  cursor: pointer;
  opacity: 0.4;
  margin-right: 4px;

  &:hover {
    opacity: 1;
  }
`;
const Button = styled.button`
  padding: 6px 10px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #855b85;
  color: white;
  border: none;
  border-radius: 6px;
  margin-left: 2px;
  font-size: 10px;
  cursor: pointer;
`;

const TodoContainer = styled.div`
  background-color: lightgray;
  padding: 6px 14px;
  margin-top: 10px;
  border-radius: 6px;
`;

const TextError = styled.p`
  color: red;
  text-align: center;
  font-weight: 500;
  margin: 20px 0;
`;

const ContainerSelector = styled.div`
  display: block;
  margin-top: 34px;
  position: relative;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    border-width: 1px;
    border-style: solid;
    border-color: transparent transparent #ada9a9 transparent;
  }
`;
const ContainerButtonSelector = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
`;

const WrapperButtonSelector = styled.div`
  background: lightgray;
  display: inline-block;
`;
const ButtonSelector = styled.button`
  margin: 0 10px;
  border: none;
  outline: none;
  background: lightgray;
  color: #8d8d8d;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline #037ef1 2px;
    color: #037ef1;
  }
`;

const ButtonAll = styled(ButtonSelector)`
  text-decoration: ${(props) => props.checkButton === 'all' && 'underline #037ef1 2px'};
  color: ${(props) => props.checkButton === 'all' && '#037ef1'};
`;

const ButtonDone = styled(ButtonSelector)`
  text-decoration: ${(props) => props.checkButton === 'done' && 'underline #037ef1 2px'};
  color: ${(props) => props.checkButton === 'done' && '#037ef1'};
`;

const ButtonUnDone = styled(ButtonSelector)`
  text-decoration: ${(props) => props.checkButton === 'undone' && 'underline #037ef1 2px'};
  color: ${(props) => props.checkButton === 'undone' && '#037ef1'};
`;

const ContainerList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  max-height: 400px;
  padding-right: 8px;
  margin-top: 18px;
`;

const ContainerPagingnation = styled.div`
  display: flex;
  justify-content: center;
  margin: 22px 0;
  align-items: center;
`;
const Select = styled.select`
  margin-left: 12px;
  outline: none;
  padding: 4px 8px;
  justify-items: right;
`;

const ItemCount = styled.p`
  margin: 0 0 0 10px;
  font-size: 14px;
  color: #9b9898;
  line-height: 14px;
  height: 14px;
  justify-items: right;
`;

const TodoList = () => {
  const todoReducer = useSelector((state) => state.todo.data);
  const TodoList = useMemo(() => todoReducer.docs ?? [] , [todoReducer]);
  const loading = useSelector((state) => state.todo.loading);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [todos, setTodos] = useState([]);
  const [textError, setTextError] = useState('');
  const [searchText, setSearchText] = useState(searchParams._searchText || '');
  const [openEdit, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openErrorLog, setOpenErrorLog] = useState(false);
  const [openAddLog, setOpenAddLog] = useState(false);
  const [editTodo, setEditTodo] = useState('');
  const searchLimit = useMemo(() => {
    return searchParams._limit > 20 ? 20 : searchParams._limit;
  }, [searchParams._limit]);
  const [limit, setLimit] = useState(searchLimit || 5);
  const [pageCount, setPageCount] = useState(
    !!(searchParams._page - 1) ? searchParams._page - 1 : 0
  );
  const pageTotal = useMemo(() => Math.ceil(todoReducer.total / limit), [todoReducer.total, limit]);
  const [detailTodo, setDetailTodo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const offset = searchParams._offset ? Number(searchParams._offset) : 0;
    const getApi = async () => {
      const result = await dispatch(getDataThunk({ limit, offset: offset }));
      if(!!result.payload.errorCode ){
        localStorage.removeItem('user_token');
        navigate('/login');
      }
    };
    getApi();
  }, [dispatch, limit, searchParams?._offset , navigate]);

  useEffect(() => {
    if (!localStorage.getItem('user_token')) {
      navigate('/login');
    }
  }, [navigate]);
  console.log(TodoList)



  let itemCountList = useMemo(() => {
    const initialList = [5, 10, 15, 20];
    if (TodoList.length === 0) return initialList;

    const list = [TodoList.length , ...initialList]
    return list;
  }, [TodoList.length]);

  // useEffect(() => {
  // function changePageCountByLogItem() {
  // let searchList = [...TodoList];
  // if (!!searchParams._searchText) {
  //   searchList = TodoList.filter((todo) =>
  //     todo.name.toLowerCase().includes(searchParams._searchText.toLowerCase())
  //   );
  // }

  // if (!!searchParams._actionLog) {
  //   if (searchParams._actionLog === 'done') {
  //     searchList = searchList.filter((todo) => !todo.status);
  //   } else if (searchParams._actionLog === 'undone') {
  //     searchList = searchList.filter((todo) => todo.status);
  //   }
  // }
  // const array = [...searchList];
  // }
  // changePageCountByLogItem();
  //   setPageTotal(Math.ceil(todoReducer.total / limit));
  // }, [limit, searchParams._searchText, TodoList, searchParams._actionLog , todoReducer]);

  // useEffect(() => {
  //   const array = [];
  //   let newArray = [...TodoList];

  // Check _actionLog is exist
  // if (!!searchParams._actionLog) {
  //   if (searchParams._actionLog === 'done') {
  //     newArray = newArray.filter((todo) => !todo.status);
  //   } else if (searchParams._actionLog === 'undone') {
  //     newArray = newArray.filter((todo) => todo.status);
  //   }
  // }

  // if (newArray.length <= limit && !searchParams?._searchText) {
  //   setTodos(newArray);
  //   return;
  // } else if (!!searchParams._searchText) {
  //   newArray = newArray.filter((todo) =>
  //     todo.name.toLowerCase().includes(searchParams._searchText.toLowerCase())
  //   );
  // }
  // for (
  //   let start = pageCount * limit;
  //   start < Number(pageCount * limit) + Number(limit);
  //   start++
  // ) {
  //   if (start >= newArray.length) break;
  //   array.push(newArray[start]);
  // }
  // setTodos(array);
  // }, [pageCount, searchParams._searchText, limit, TodoList, searchParams._actionLog]);

  const handleChangeSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  function handleSearchButton() {
    if (!searchText) {
      setSearchParams({ ...searchParams, _searchText: '' });
      // setPageTotal(TodoList.length / limit);
      return;
    }
    const newArray = TodoList.filter((todo) =>
      todo.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (newArray.length <= 0 && searchText) setTextError("Can't find todo list");
    else setTextError('');

    setPageCount(0);
    setSearchParams({ ...searchParams, _page: 1, _searchText: searchText });
    // setPageTotal(newArray.length / limit);
  }

  const handleDeleteSearchInput = () => {
    setSearchText('');
    setSearchParams({ ...searchParams, _searchText: '' });
  };

  const handleChangeActionLog = (e) => {
    delete searchParams._searchText;
    setSearchParams({ ...searchParams, _actionLog: e.target.name, _page: 1 });
    setPageCount(0);
  };

  const handleDetail = (todo) => {
    setDetailTodo(todo);
  };

  const handleEdit = (id) => {
    const todoEdit = todos.find((todo) => todo.id === id);
    setEditTodo(todoEdit);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    setSearchParams({ ...searchParams, _page: 1 });
    await dispatch(deleTodoThunk(id));
    await dispatch(getDataThunk({limit , offset:searchParams._offset}))
  };

  const handleChangeLogItem = (e) => {
    setLimit(e.target.value);
    delete searchParams._page;
    setSearchParams({ ...searchParams, _limit: e.target.value });
    setPageCount(0);
  };

  const handleSaveTodo = async (editedTodo) => {
    await dispatch(editTodoThunk(editedTodo));
    setSearchParams({ ...searchParams, _page: 1 });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (loading) return;

  return (
    <>
      <Container>
        <ContainerHeader>
          <Title>Todo List</Title>
          <ContainerHeaderButton>
            <ButtonAdd onClick={() => setOpenAddLog(true)}>
              <IoMdAddCircle />
            </ButtonAdd>
            <ButtonLogOut onClick={handleLogout}>
              <FaSignOutAlt />
            </ButtonLogOut>
          </ContainerHeaderButton>
        </ContainerHeader>

        <TodoContainer>
          <SearchContainer>
            <InputContainer>
              <Input
                placeholder="Search"
                value={searchText}
                onChange={handleChangeSearchInput}
                onKeyUp={(e) => e.key === 'Enter' && handleSearchButton()}
              />
              {searchText && (
                <Times onClick={handleDeleteSearchInput}>
                  <TiTimes />
                </Times>
              )}
            </InputContainer>
            <Button onClick={handleSearchButton}>Search</Button>
          </SearchContainer>

          <ContainerSelector>
            <ContainerButtonSelector>
              <WrapperButtonSelector>
                <ButtonAll
                  checkButton={searchParams._actionLog}
                  onClick={handleChangeActionLog}
                  name="all"
                >
                  All ({TodoList.length})
                </ButtonAll>
                <ButtonDone
                  checkButton={searchParams._actionLog}
                  onClick={handleChangeActionLog}
                  name="done"
                >
                  Done ({TodoList.filter((todo) => !todo.status).length})
                </ButtonDone>
                <ButtonUnDone
                  checkButton={searchParams._actionLog}
                  onClick={handleChangeActionLog}
                  name="undone"
                >
                  Undone ({TodoList.filter((todo) => todo.status).length})
                </ButtonUnDone>
              </WrapperButtonSelector>
            </ContainerButtonSelector>
          </ContainerSelector>

          {todos.length > 0 || <TextError>{textError}</TextError>}
          <ContainerList>
            {TodoList.map((todo, index) => {
              return (
                <TodoItem
                  handleDetail={handleDetail}
                  setOpenDetail={setOpenDetail}
                  key={todo.id}
                  todo={todo}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  index={index}
                />
              );
            })}
          </ContainerList>
          <ContainerPagingnation>
            <PaginatedItems
              pageCount={pageCount}
              pageTotalCount={pageTotal}
              setPagecount={setPageCount}
              setSearchparams={setSearchParams}
              searchParams={searchParams}
              limit={limit}
            />
            <Select value={limit} onChange={handleChangeLogItem}>
              {itemCountList.map((item, index) => (
                <option key={index} value={item}>
                  {item} items
                </option>
              ))}
            </Select>
            <ItemCount>Have {todoReducer.total} items</ItemCount>
          </ContainerPagingnation>
        </TodoContainer>
      </Container>
      {openAddLog && <AddTable searchParams={searchParams} setOpen={setOpenAddLog} limit={limit} />}
      {openErrorLog && <ErrorLog setOpenErrorLog={setOpenErrorLog} />}
      {openEdit && (
        <EditTable setOpen={setOpen} editTodo={editTodo} handleSaveTodo={handleSaveTodo} />
      )}
      {openDetail && <Detail setOpenDetail={setOpenDetail} todo={detailTodo} />}
    </>
  );
};

export default TodoList;
