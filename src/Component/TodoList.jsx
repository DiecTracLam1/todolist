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
  const [pageCount, setPageCount] = useState(!!(searchParams._page - 1) ? searchParams._page : 0);
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
    if (!!searchText) {
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
      if (!!searchParams._searchText) {
        searchList = todoStorage.filter((todo) =>
          todo.content.toLowerCase().includes(searchParams._searchText.toLowerCase())
        );
      }

      if (!!searchParams._actionLog) {
        if (searchParams._actionLog === 'done') {
          searchList = searchList.filter((todo) => todo.done);
        } else if (searchParams._actionLog === 'undone') {
          searchList = searchList.filter((todo) => !todo.done);
        }
      }
      const array = [...searchList];
      setPageTotal(Math.ceil(array.length / logItem));
    }
    changePageCountByLogItem();
  }, [logItem, searchParams._searchText, todoStorage, searchParams._actionLog]);

  useEffect(() => {
    const array = [];
    let newArray = [...todoStorage];

    // Check _actionLog is exist
    if (!!searchParams._actionLog) {
      if (searchParams._actionLog === 'done') {
        newArray = newArray.filter((todo) => todo.done);
      } else if (searchParams._actionLog === 'undone') {
        newArray = newArray.filter((todo) => !todo.done);
      }
    }

    if (newArray.length <= logItem && !searchParams?._searchText) {
      setTodos(newArray);
      return;
    } else if (!!searchParams._searchText) {
      newArray = newArray.filter((todo) =>
        todo.content.toLowerCase().includes(searchParams._searchText.toLowerCase())
      );
    }

    for (
      let start = pageCount * logItem;
      start < Number(pageCount * logItem) + Number(logItem);
      start++
    ) {
      if (start >= newArray.length) break;
      array.push(newArray[start]);
    }
    setTodos(array);
  }, [pageCount, searchParams._searchText, logItem, todoStorage, searchParams._actionLog]);

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
    if (newArray.length <= 0 && !!searchParams._searchText) setTextError("Can't find todo list");
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

  const handleChangeActionLog = (e) => {
    setSearchParams({ ...searchParams, _actionLog: e.target.name, _page: 1 });
    setPageCount(0);
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
                <ButtonAll
                  checkButton={searchParams._actionLog}
                  onClick={handleChangeActionLog}
                  name="all"
                >
                  All ({todoStorage.length})
                </ButtonAll>
                <ButtonDone
                  checkButton={searchParams._actionLog}
                  onClick={handleChangeActionLog}
                  name="done"
                >
                  Done ({todoStorage.filter((todo) => todo.done).length})
                </ButtonDone>
                <ButtonUnDone
                  checkButton={searchParams._actionLog}
                  onClick={handleChangeActionLog}
                  name="undone"
                >
                  Undone ({todoStorage.filter((todo) => !todo.done).length})
                </ButtonUnDone>
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
