import React from 'react';
import styled from 'styled-components';
import { BiTrash } from 'react-icons/bi';
import { AiOutlineForm } from 'react-icons/ai';
import { MdOutlineDone } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { editTodoThunk } from '../../../features/todo/todoSlice';
import { CgNotes } from 'react-icons/cg';

const ContainerItem = styled.li`
  display: flex;
  padding: 8px;
  margin: 8px 0;
  border-bottom: 2px solid #a3b8f1;
  background-color: aquamarine;
  border-radius: 12px;
  justify-content: space-between;
  align-items: center;
`;

const WrapContent = styled.div`
  flex: 1;
  text-decoration: ${(props) => !props.doneTask && 'line-through'};
  opacity: ${(props) => !props.doneTask && 0.6};
`;
const Content = styled.div`
  flex: 1;
  font-size: 16px;
  margin-left: 2px;
  font-weight: 600;
`;
const Description = styled.p`
  overflow: hidden;
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  margin: 6px 0;
  color: #a3a2a2;
  font-size: 14px;
  height: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  padding: 4px 8px;
  text-transform: uppercase;
  font-size: 10px;
  margin: 0 2px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  max-height: 26px;
`;

const EdditButton = styled(Button)`
  background-color: #f0f032;
`;

const DeleButton = styled(Button)`
  background-color: #f02906;
`;

const DoneButton = styled(Button)`
  background-color: #0dbd0d;
  color: white;
  opacity: ${(props) => !props.doneTask && 0.6};
`;

const DetailButton = styled(Button)`
  background-color: #0da8bd;
`;

const TodoItem = ({ todo, handleDelete, handleEdit, handleDetail, setOpenDetail }) => {
  const dispatch = useDispatch();
  const handleCLickLogDetail = () => {
    setOpenDetail(true);
    handleDetail(todo);
  };
  const handleButtonDone = async () => {
    const newTodo = { ...todo };
    newTodo.status = Number(!newTodo.status);
    await dispatch(editTodoThunk(newTodo));
  };
  return (
    <ContainerItem>
      <WrapContent doneTask={todo?.status}>
        <Content Content>{` ${todo?.name} - ${todo.id}`}</Content>
        {todo?.note && <Description>{todo?.note}</Description>}
      </WrapContent>
      <ButtonContainer>
        <DoneButton doneTask={todo?.status} onClick={handleButtonDone}>
          <MdOutlineDone />
        </DoneButton>
        <DetailButton onClick={handleCLickLogDetail}>
          <CgNotes />
        </DetailButton>
        <EdditButton onClick={() => handleEdit(todo)}>
          <AiOutlineForm />
        </EdditButton>
        <DeleButton onClick={() => handleDelete(todo?.id)}>
          <BiTrash />
        </DeleButton>
      </ButtonContainer>
    </ContainerItem>
  );
};

export default TodoItem;
