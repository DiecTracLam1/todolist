import React, { useEffect, useMemo, useState } from "react";
import useCustomSearchParams from "../useCustom/useCustomSearchParams";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import EditTable from "./EditTable";
import PaginatedItems from "./Pagingnation";
import {TiTimes} from 'react-icons/ti'

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
  display:flex;

`
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
  opacity : 0.4;
  margin-right : 4px;

  &:hover{
    opacity : 1;
  }
`
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

const ContainerList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  max-height: 400px;
  padding-right: 8px;
`;

const ContainerPagingnation = styled.div`
  display: flex;
  justify-content: center;
  margin: 22px 0;
`;
const Select = styled.select`
  margin-left: 12px;
  outline: none;
  padding: 4px 8px;
  justify-items: right;
`;

const TodoList = () => {
  const todoStorage =
    localStorage.getItem("todoList") !== null
      ? JSON.parse(localStorage.getItem("todoList"))
      : [];
  const [lastId, setLastId] = useState(
    localStorage.getItem("lastID") === null
      ? 0
      : JSON.parse(localStorage.getItem("lastID"))
  );
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [todos, setTodos] = useState(todoStorage);
  const [textError, setTextError] = useState("");
  const [addText, setAddText] = useState(searchParams._addText || "");
  const [searchText, setSearchText] = useState(searchParams._searchText || "");
  const [openEdit, setOpen] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const searchLogItem = searchParams._logItem > 20 ? 20 : searchParams._logItem;
  const [logItem, setLogItem] = useState(searchLogItem || 5);
  const [pageCount, setPageCount] = useState(searchParams._page - 1 || 0);
  const [pageTotal, setPageTotal] = useState(Math.ceil(todos.length / logItem));

  let itemCountList = useMemo(() => {
    const initialList = [5,10,15,20]
    const list = initialList.reduce((item , currenItem , index) => {      
      if(initialList.length - 1 === index){
        if(currenItem < todoStorage.length)
          return item.concat([currenItem , todoStorage.length])
      }
      return item.concat(currenItem)
    } , [])
    return list
  },[todoStorage.length])

  useEffect(() => {
    //Check search params exist ???/
    if (searchParams._searchText?.length > 0) {
      setTodos(
        todoStorage.filter((todo) =>
          todo.content
            .toLowerCase()
            .includes(searchParams._searchText.toLowerCase())
        )
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changePageCountByAction(searchList = [...todoStorage] ) {
    if(!!searchText !== false){
      searchList = todoStorage.filter((todo) =>
        todo.content.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    const array = [...searchList];
    const newArray = []
    for (let i = 0; i < logItem; i++) {
      if (i === array.length) break;
      newArray.push(array[i]);
    }
    setPageTotal(Math.ceil(array.length / logItem));
    setPageCount(searchParams?._page - 1 || 0);
    setTodos(newArray);
  }

  // console.log(searchParams?._page - 1)
  useEffect(() => {
    changePageCountByAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ logItem ]);


  useEffect(() => {
    console.log("Go to pagecount")
    const array = [];
    if (todoStorage.length <= logItem) {
      setTodos(todoStorage);
    } 
    else if(!!searchParams._searchText !== false){
      const newArray = todoStorage.filter((todo) =>
        todo.content.toLowerCase().includes(searchParams._searchText.toLowerCase())
      );
      console.log(newArray)
      for (let start = pageCount * logItem ; start < Number(pageCount * logItem) + Number(logItem); start++) {
        if (start >= newArray.length) break;
        array.push(newArray[start]);
      }
      setTodos(array);
    }
    else {

      for (let start = pageCount * logItem ; start < Number(pageCount * logItem) + Number(logItem); start++) {
        if (start >= todoStorage.length) break;
        array.push(todoStorage[start]);
      }
      setTodos(array);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount]);

  const handleChangeAddInput = (e) => {
    setAddText(e.target.value);
    setSearchParams({ ...searchParams, _addText: e.target.value });
  };

  function addListTodo() {
    const newTodo = [{ id: lastId + 1, content: addText },...todoStorage];
    changePageCountByAction(newTodo);
    localStorage.setItem("todoList", JSON.stringify(newTodo));
    localStorage.setItem("lastID", JSON.stringify(lastId + 1));
    setLastId(lastId + 1);
    setAddText("");
    delete searchParams._addText;
    setSearchParams(searchParams);
  }

  const handleEnterAddInput = (e) => {
    if (e.key === "Enter") {
      if (addText === "") return;
      addListTodo();
    }
  };
  const handleAddButton = () => {
    if (addText === "") return;
    addListTodo();
  };

  const handleChangeSearchInput = (e) => {
    setSearchText(e.target.value);
    // setSearchParams({ ...searchParams, _searchText: e.target.value });
  };

  function changeEventSearch(){
    if (searchText === "") {
      setSearchParams({...searchParams , _searchText : ''})
      changePageCountByAction(JSON.parse(localStorage.getItem("todoList")));
      return;
    }
    const newArray = todoStorage.filter((todo) =>
      todo.content.toLowerCase().includes(searchText.toLowerCase())
    );
    if (newArray.length <= 0) setTextError("Can't find todo list");
    else setTextError("");
    setPageCount(0)
    setSearchParams({ ...searchParams, _page : 1 , _searchText : searchText})
    changePageCountByAction(newArray)
  }

  const handleEnterSearchInput = (e) => {
    if (e.key === "Enter") {
      changeEventSearch()
    }
  };

  const handleDeleteSearchInput = () => {
    setSearchText("")
    // changePageCountByAction(todoStorage , "")
  }

  const handleDeleteAddInput = () => {
    setAddText("")
  }

  const handleSearchButton = () => {
    changeEventSearch()
  };

  const handleEdit = (id) => {
    const todoEdit = todos.find((todo) => todo.id === id);
    setEditTodo(todoEdit);
    setOpen(true);
  };

  const handleDelete = (id) => {
    const newArray = todoStorage.filter((todo) => todo.id !== id);
    setSearchParams({...searchParams , _page: 1})
    changePageCountByAction(newArray);
    localStorage.setItem("todoList", JSON.stringify(newArray));
  };

  const handleChangeLogItem = (e) => {
    setLogItem(e.target.value);
    delete searchParams._page;
    setSearchParams({ ...searchParams, _logItem: e.target.value });
  };

  const handleSaveTodo = (editTodo, oldIndex ,newIndex) => {
    let tampTodo;
    let newArray = todoStorage.map((todo , i)=>{
      tampTodo = {...todoStorage[newIndex]}
      if( i === Number(newIndex)){
        todo = {...editTodo}
      }
      else if( i === Number(oldIndex)){
        todo = {...tampTodo}
      }
      return todo;
    } )
    localStorage.setItem('todoList', JSON.stringify(newArray));
    setSearchParams({...searchParams , _page:1})
    changePageCountByAction(newArray)
  };


  return (
    <>
      <Container>
        <Title>Todo List</Title>
        <SearchContainer>
          <InputContainer style={{border:"1px solid black"}}>
            <Input
              placeholder="Add Todo..."
              value={addText}
              onChange={handleChangeAddInput}
              onKeyUp={handleEnterAddInput}
            />
            {addText && <Times onClick={handleDeleteAddInput}><TiTimes/></Times>}
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
              {searchText && <Times onClick={handleDeleteSearchInput}><TiTimes/></Times>}
            </InputContainer>
            <Button onClick={handleSearchButton}>Search</Button>
          </SearchContainer>

          {todos.length > 0 || <TextError>{textError}</TextError>}
          <ContainerList>
            {todos.map((todo, index) => {
              return (
                <TodoItem
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
            />
            <Select value={logItem} onChange={handleChangeLogItem}>
              {itemCountList.map((item,index) => <option key={index} value={item}>{item} items</option>)}
            </Select>
          </ContainerPagingnation>
        </TodoContainer>
      </Container>
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
