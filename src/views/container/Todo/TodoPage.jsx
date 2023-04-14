import { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '~/features/user/userSlice';
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
  const [openTable, setOpenTable] = useState('');
  const [currentTodo, setCurrentTodo] = useState('');
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
          openTable={openTable}
          currentTodo={currentTodo}
        />
      </Container>
    </>
  );
};

export default TodoList;
