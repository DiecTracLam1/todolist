import { useEffect, useMemo, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { editTodoThunk } from '~/features/todo/todoSlice';
import { logout } from '~/features/user/userSlice';
import useCustomSearchParams from '~/useCustom/useCustomSearchParams';

import TodoTable from '../../presentation/Form/TodoForm';
import TodoContainer from './TodoContainer';

const Container = styled.div`
  width: 860px;
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

const TodoList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [openTable, setOpenTable] = useState('');
  const [currentTodo, setCurrentTodo] = useState('');
  const [pageCount, setPageCount] = useState(
    !!(searchParams._page - 1) ? searchParams._page - 1 : 0
  );
  const searchLimit = useMemo(() => {
    return searchParams._limit > 20 ? 20 : searchParams._limit;
  }, [searchParams._limit]);
  const [limit, setLimit] = useState(searchLimit || 5);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user_token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleAddTable = () => {
    setCurrentTodo({});
    setOpenTable('Add');
  };

  const handleSaveTodo = async (editedTodo) => {
    await dispatch(editTodoThunk(editedTodo));
    setSearchParams({ ...searchParams, _page: 1 });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <Container>
        <ContainerHeader>
          <Title>Todo List</Title>
          <ContainerHeaderButton>
            <ButtonAdd onClick={handleAddTable}>
              <IoMdAddCircle />
            </ButtonAdd>
            <ButtonLogOut onClick={handleLogout}>
              <FaSignOutAlt />
            </ButtonLogOut>
          </ContainerHeaderButton>
        </ContainerHeader>

        <TodoContainer
          setCurrentTodo={setCurrentTodo}
          setOpenTable={setOpenTable}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setPageCount={setPageCount}
          limit={limit}
          pageCount={pageCount}
          setLimit={setLimit}
        />

        {openTable !== '' && (
          <TodoTable
            setOpenTable={setOpenTable}
            openTable={openTable}
            currentTodo={currentTodo}
            handleSaveTodo={handleSaveTodo}
            searchParams={searchParams}
            limit={limit}
            setSearchParams={setSearchParams}
            setPageCount={setPageCount}
          />
        )}
      </Container>
    </>
  );
};

export default TodoList;
