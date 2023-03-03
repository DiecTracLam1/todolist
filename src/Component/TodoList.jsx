import React, { useEffect, useState } from "react";
import useCustomSearchParams from "../useCustom/useCustomSearchParams";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import EditTable from "./EditTable";
import PaginatedItems from "./Pagingnation";

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

const InputContainer = styled.div`
  display: flex;
`;
const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #cdcccc;
  outline: none;
  border-radius: 6px;
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
  }, []);

  function changePageCountBySearch(searchList = [...todoStorage]) {
    const array = [...searchList];
    const newArray = []
    console.log("searchList: ", searchList);
    for (let i = 0; i < logItem; i++) {
      if (i === array.length) break;
      newArray.push(array[i]);
    }
    setPageTotal(Math.ceil(array.length / logItem));
    setPageCount(searchParams?._page - 1 || 0);
    setTodos(newArray);
  }

  useEffect(() => {
    changePageCountBySearch()
  }, [logItem]);


  useEffect(() => {
    console.log("dasd")
    if (todoStorage.length <= logItem) {
      setTodos(todoStorage);
    } 
    else if(!!searchParams._searchText !== false){
      const newArray = todoStorage.filter((todo) =>
        todo.content.toLowerCase().includes(searchParams._searchText.toLowerCase())
      );
      console.log(newArray)
      // changePageCountBySearch(newArray)
    }
    else {
      const array = [];
      for (let start = pageCount * logItem ; start < Number(pageCount * logItem) + Number(logItem); start++) {
        if (start >= todoStorage.length) break;
        array.push(todoStorage[start]);
      }
      setTodos(array);
    }
  }, [pageCount , searchParams._searchText]);

  const handleChangeAddInput = (e) => {
    setAddText(e.target.value);
    setSearchParams({ ...searchParams, _addText: e.target.value });
  };

  function addListTodo() {
    const newTodo = [...todos, { id: lastId + 1, content: addText }];
    setTodos(newTodo);
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
    setSearchParams({ ...searchParams, _searchText: e.target.value });
  };

  const handleEnterSearchInput = (e) => {
    if (e.key === "Enter") {
      if (searchText === "") {
        setTodos(JSON.parse(localStorage.getItem("todoList")));
        return;
      }
      const newTodo = todoStorage.filter((todo) =>
        todo.content.toLowerCase().includes(searchText.toLowerCase())
      );
      if (newTodo.length <= 0) setTextError("Can't find todo list");
      else setTextError("");
      setTodos(newTodo);
      setSearchText("");

    }
  };

  const handleSearchButton = () => {
    if (searchText === "") {
      setTodos(JSON.parse(localStorage.getItem("todoList")));
      return;
    }
    const newArray = todoStorage.filter((todo) =>
      todo.content.toLowerCase().includes(searchText.toLowerCase())
    );
    if (newArray.length <= 0) setTextError("Can't find todo list");
    else setTextError("");
    setSearchText("");
    // setTodos(newArray);
    setPageCount(0)
    setSearchParams({ ...searchParams, _page : 1})
    changePageCountBySearch(newArray)
  };

  const handleEdit = (id) => {
    const todoEdit = todos.find((todo) => todo.id === id);
    setEditTodo(todoEdit);
    setOpen(true);
  };

  const handleDelete = (id) => {
    const newArray = todos.filter((todo) => todo.id !== id);
    setTodos(newArray);
    localStorage.setItem("todoList", JSON.stringify(newArray));
  };

  const handleChangeLogItem = (e) => {
    setLogItem(e.target.value);
    delete searchParams._page;
    setSearchParams({ ...searchParams, _logItem: e.target.value });
  };

  const handleSaveTodo = (editTodo, newIndex) => {
    console.log(todos);
    let newArray = [...todos];
    console.log(newArray);

    console.log("new index", newIndex);
    newArray = todos.map((todo, i) => {
      if (todos.length - i - 1 > newIndex) {
        console.log("Prev" + newArray[Number(todos.length - i)]);
        console.log("After" + newArray[Number(todos.length - i - 1)]);
        newArray[Number(todos.length - i - 1)] = {
          ...newArray[Number(todos.length - i - 2)],
        };
      }
      console.log(
        "todos.length - i = ",
        todos.length - i,
        "newIndex",
        newIndex
      );
      if (todos.length - i - 1 === Number(newIndex)) {
        console.log("qeqw");
        newArray[i] = { ...editTodo };
      }
      debugger;
      return todo;
    });
    console.log(newArray);
    // setTodos(newArray)
    // localStorage.setItem('todoList', JSON.stringify(newArray));
  };

  return (
    <>
      <Container>
        <Title>Todo List</Title>
        <InputContainer>
          <Input
            placeholder="Add Todo..."
            value={addText}
            onChange={handleChangeAddInput}
            onKeyUp={handleEnterAddInput}
          />
          <Button onClick={handleAddButton}>Add</Button>
        </InputContainer>

        <TodoContainer>
          <InputContainer>
            <Input
              placeholder="Search"
              value={searchText}
              onChange={handleChangeSearchInput}
              onKeyUp={handleEnterSearchInput}
            />
            <Button onClick={handleSearchButton}>Search</Button>
          </InputContainer>

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
              <option value="5">5 items</option>
              <option value="10">10 items</option>
              <option value="15">15 items</option>
              <option value="20">20 items</option>
            </Select>
          </ContainerPagingnation>
        </TodoContainer>
      </Container>
      {openEdit && (
        <EditTable
          setOpen={setOpen}
          editTodo={editTodo}
          todoList={todos}
          handleSaveTodo={handleSaveTodo}
        />
      )}
    </>
  );
};

export default TodoList;
