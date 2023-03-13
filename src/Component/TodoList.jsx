import React, { useEffect, useMemo, useState } from 'react';
import useCustomSearchParams from '../useCustom/useCustomSearchParams';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import EditTable from './EditTable';
import PaginatedItems from './Pagingnation';
import { TiTimes } from 'react-icons/ti';
import ErrorLog from './ErrorLog';
import { useDispatch, useSelector } from 'react-redux';
import { add, done, edit, remove } from '../features/todo/todoSlice';

const Container = styled.div`
  width: 700px;
  margin: auto;
`;
const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  background-color: #685e5e;
  color: white;
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
  margin: 10px 0;
`;

const ContainerSelector = styled.div`
  display: block;
  margin-top: 34px; 
`;
const ContainerButtonSelector = styled.div`
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

const WrapperButtonSelector = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
`;
const ButtonSelector = styled.button`
  margin: 0 10px;
  border: none;
  outline: none;
  background: lightgray;
  color : #8d8d8d;
  cursor: pointer;
  font-size: 14px;

  &:hover{
    text-decoration: underline #037ef1 2px; 
    color : #037ef1;
  }
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
  justify-items:right;
`;

const TodoList = () => {
  const [lastId, setLastId] = useState(
    localStorage.getItem('lastID') === null ? 0 : JSON.parse(localStorage.getItem('lastID'))
  );
  const todoStorage = useSelector((state) => state.todo.data);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [todos, setTodos] = useState([]);
  const [textError, setTextError] = useState('');
  const [addText, setAddText] = useState(searchParams._addText || '');
  const [searchText, setSearchText] = useState(searchParams._searchText || '');
  const [openEdit, setOpen] = useState(false);
  const [openErrorLog, setOpenErrorLog] = useState(false);
  const [editTodo, setEditTodo] = useState('');
  const searchLogItem = useMemo(() => {
    return searchParams._logItem > 20 ? 20 : searchParams._logItem;
  }, [searchParams._logItem]);
  const [logItem, setLogItem] = useState(searchLogItem || 5);
  const [pageCount, setPageCount] = useState(searchParams._page - 1 || 0);
  const [pageTotal, setPageTotal] = useState(Math.ceil(todos.length / logItem));

  let itemCountList = useMemo(() => {
    const initialList = [5, 10, 15, 20];
    const list = initialList.reduce((item, currenItem, index) => {
      if (initialList.length - 1 === index) {
        if (currenItem < todoStorage.length) return item.concat([currenItem, todoStorage.length]);
      }
      return item.concat(currenItem);
    }, []);
    return list;
  }, [todoStorage.length]);

  function changePageCountByAction(searchList = [...todoStorage]) {
    if (!!searchText !== false) {
      searchList = todoStorage.filter((todo) =>
        todo.content.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    const array = [...searchList];
    setPageTotal(Math.ceil(array.length / logItem));
  }

  useEffect(() => {
    function changePageCountByLogItem() {
      let searchList = [...todoStorage];
      if (!!searchParams._searchText !== false) {
        searchList = todoStorage.filter((todo) =>
          todo.content.toLowerCase().includes(searchParams._searchText.toLowerCase())
        );
      }
      const array = [...searchList];
      setPageTotal(Math.ceil(array.length / logItem));

      // const newArray = [];
      // for (let i = 0; i < logItem; i++) {
      //   if (i === array.length) break;
      //   newArray.push(array[i]);
      // }

      // setTodos(newArray);
    }
    changePageCountByLogItem();
  }, [logItem, searchParams._searchText, todoStorage]);

  useEffect(() => {
    const array = [];
    if (todoStorage.length <= logItem && !!searchParams._searchText === false) {
      setTodos(todoStorage);
    } else if (!!searchParams._searchText !== false) {
      const newArray = todoStorage.filter((todo) =>
        todo.content.toLowerCase().includes(searchParams._searchText.toLowerCase())
      );
      for (
        let start = pageCount * logItem;
        start < Number(pageCount * logItem) + Number(logItem);
        start++
      ) {
        if (start >= newArray.length) break;
        array.push(newArray[start]);
      }
      setTodos(array);
    } else {
      for (
        let start = pageCount * logItem;
        start < Number(pageCount * logItem) + Number(logItem);
        start++
      ) {
        if (start >= todoStorage.length) break;
        array.push(todoStorage[start]);
      }
      setTodos(array);
    }
  }, [pageCount, searchParams._searchText, logItem, todoStorage]);

  const handleChangeAddInput = (e) => {
    setAddText(e.target.value);
    setSearchParams({ ...searchParams, _addText: e.target.value });
  };

  function addListTodo() {
    const checkAddText = todoStorage.findIndex((todo) => todo.content === addText);
    if (checkAddText >= 0) {
      setOpenErrorLog(true);
      return;
    }
    dispatch(add({ lastId, addText }));
    setLastId(lastId + 1);
    setAddText('');
    delete searchParams._addText;
    setSearchParams(searchParams);
  }

  const handleEnterAddInput = (e) => {
    if (e.key === 'Enter') {
      if (addText === '') return;
      addListTodo();
    }
  };
  const handleAddButton = () => {
    if (addText === '') return;
    addListTodo();
  };

  const handleChangeSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  function changeEventSearch() {
    if (searchText === '') {
      setSearchParams({ ...searchParams, _searchText: '' });
      changePageCountByAction(todoStorage);
      return;
    }
    const newArray = todoStorage.filter((todo) =>
      todo.content.toLowerCase().includes(searchText.toLowerCase())
    );
    if (newArray.length <= 0) setTextError("Can't find todo list");
    else setTextError('');
    setPageCount(0);
    setSearchParams({ ...searchParams, _page: 1, _searchText: searchText });
    changePageCountByAction(newArray);
  }

  const handleEnterSearchInput = (e) => {
    if (e.key === 'Enter') {
      changeEventSearch();
    }
  };

  const handleDeleteSearchInput = () => {
    setSearchText('');
    setSearchParams({ ...searchParams, _searchText: '' });
  };

  const handleDeleteAddInput = () => {
    setAddText('');
  };

  const handleSearchButton = () => {
    changeEventSearch();
  };

  const handleDone = (id) => {
    dispatch(done(id));
  };

  const handleEdit = (id) => {
    const todoEdit = todos.find((todo) => todo.id === id);
    setEditTodo(todoEdit);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setSearchParams({ ...searchParams, _page: 1 });
    dispatch(remove(id));
  };

  const handleChangeLogItem = (e) => {
    setLogItem(e.target.value);
    delete searchParams._page;
    setSearchParams({ ...searchParams, _logItem: e.target.value });
    setPageCount(0);
  };

  const handleSaveTodo = (editTodo, oldIndex, newIndex) => {
    dispatch(edit({ editTodo, oldIndex, newIndex }));
    setSearchParams({ ...searchParams, _page: 1 });
  };

  return (
    <>
      <Container>
        <Title>Todo List</Title>
        <SearchContainer>
          <InputContainer style={{ border: '1px solid black' }}>
            <Input
              placeholder="Add Todo..."
              value={addText}
              onChange={handleChangeAddInput}
              onKeyUp={handleEnterAddInput}
            />
            {addText && (
              <Times onClick={handleDeleteAddInput}>
                <TiTimes />
              </Times>
            )}
          </InputContainer>
          <Button onClick={handleAddButton}>Add</Button>
        </SearchContainer>

        <TodoContainer>
          <SearchContainer>
            <InputContainer>
              <Input
                placeholder="Search"
                value={searchText}
                onChange={handleChangeSearchInput}
                onKeyUp={handleEnterSearchInput}
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
                <div style={{ background: 'lightgray' , display:'inline-block' }}>
                  <ButtonSelector >All</ButtonSelector>
                  <ButtonSelector >Done</ButtonSelector>
                  <ButtonSelector >Undone</ButtonSelector>
                </div>
              </WrapperButtonSelector>
            </ContainerButtonSelector>
          </ContainerSelector>

          {todos.length > 0 || <TextError>{textError}</TextError>}
          <ContainerList>
            {todos.map((todo, index) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleDone={handleDone}
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
            />
            <Select value={logItem} onChange={handleChangeLogItem}>
              {itemCountList.map((item, index) => (
                <option key={index} value={item}>
                  {item} items
                </option>
              ))}
            </Select>
            <ItemCount>Have {todoStorage.length} items</ItemCount>
          </ContainerPagingnation>
        </TodoContainer>
      </Container>
      {openErrorLog && <ErrorLog setOpenErrorLog={setOpenErrorLog} />}
      {openEdit && (
        <EditTable
          setOpen={setOpen}
          editTodo={editTodo}
          todoList={todoStorage}
          handleSaveTodo={handleSaveTodo}
        />
      )}
    </>
  );
};

export default TodoList;
